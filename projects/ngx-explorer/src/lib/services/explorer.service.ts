import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { INode, Dictionary, NgeExplorerConfig } from '../shared/types';
import { Utils } from '../shared/utils';
import { DataService } from './data.service';
import { CONFIG } from '../shared/providers';

@Injectable({
    providedIn: 'root',
})
export class ExplorerService {
    private internalTree = Utils.createNode();
    private flatPointers: Dictionary<INode> = { [this.internalTree.id]: this.internalTree };

    private readonly selectedNodes$$ = new BehaviorSubject<INode[]>([]);
    private readonly openedNode$$ = new BehaviorSubject<INode | undefined>(undefined);
    private readonly root$$ = new BehaviorSubject<INode>(this.internalTree);

    /**
    * An Observable that emits the currently selected nodes in the explorer.
    * Subscribers can use this to react to changes in the selection.
    */
    public readonly selection$ = this.selectedNodes$$.asObservable();

    /**
     * An Observable that emits the currently opened directory in the explorer.
     * Subscribers can use this to react to changes in the opened directory.
     */
    public readonly openedDir$ = this.openedNode$$.asObservable();

    /**
     * An Observable that emits the root node of the explorer.
     * Subscribers can use this to react to changes in the root node.
     */
    public readonly root$ = this.root$$.asObservable();

    constructor(
        private dataService: DataService,
        @Inject(CONFIG) private config: NgeExplorerConfig
    ) {
        this.openNode(this.internalTree.id);

        if (this.config.autoRefresh) {
            setInterval(() => {
                this.refresh();
            }, this.config.autoRefreshInterval);
        }
    }

    /**
     * Returns the node with the given id.
     * @param id The id of the node to retrieve.
     */
    public getNode(id: number) {
        return this.flatPointers[id];
    }

    /**
     * Sets the selected nodes in the explorer.
     * @param nodes The nodes to select.
     */
    public select(nodes: INode[]) {
        this.selectedNodes$$.next(nodes);
    }

    /**
     * Opens the node with the given id.
     * @param id The id of the node to open.
     */
    public openNode(id: number) {
        this.getContent(id).subscribe(() => {
            const parent = this.flatPointers[id];
            this.openedNode$$.next(parent);
            this.selectedNodes$$.next([]);
        });
    }

    /**
     * Expands the node with the given id.
     * @param id The id of the node to expand.
     */
    public expand(id: number) {
        this.getContent(id).subscribe();
    }

    /**
     * Creates a new directory with the given name in the currently opened directory.
     * @param name The name of the new directory.
     */
    public createDir(name: string) {
        const parent = this.openedNode$$.value;
        this.dataService.createDir(parent!.data, name).subscribe(() => {
            this.refresh();
        });
    }

    /**
     * Refreshes the currently opened node.
     */
    public refresh() {
        this.openNode(this.openedNode$$.value!.id);
    }

    /**
     * Renames the currently selected node.
     * @param name The new name for the node.
     */
    public rename(name: string) {
        const nodes = this.selectedNodes$$.value;
        if (nodes.length > 1) {
            throw new Error('Multiple selection rename not supported');
        }
        if (nodes.length === 0) {
            throw new Error('Nothing selected to rename');
        }

        const node = nodes[0];
        this.dataService.rename(node.data, name).subscribe(() => {
            this.refresh();
        });
    }

    /**
     * Removes the currently selected nodes.
     */
    public remove() {
        const selection = this.selectedNodes$$.value;
        if (selection.length === 0) {
            throw new Error('Nothing selected to remove');
        }

        const targets = selection.map((node) => this.flatPointers[node.id].data);
        this.dataService.delete(targets).subscribe(() => {
            this.refresh();
        });
    }

    /**
     * Uploads the given files to the currently opened directory.
     * @param files The files to upload.
     */
    public upload(files: FileList) {
        const node = this.openedNode$$.value!;
        this.dataService.uploadFiles(node.data, files).subscribe(() => {
            this.refresh();
        });
    }

    /**
     * Downloads the currently selected file.
     */
    public download() {
        const target = this.selectedNodes$$.value[0];
        this.dataService.downloadFile(target.data).subscribe(() => {
            this.refresh();
        });
    }

    private getContent(id: number) {
        const parent = this.flatPointers[id];

        if (!parent) {
            throw new Error('Node not found');
        }

        if (parent.isLeaf) {
            throw new Error('Cannot open a file node');
        }

        return this.dataService.getContent(parent.data).pipe(
            tap(({ files, dirs }) => {
                const newDirNodes = dirs.map((data) => Utils.createNode(id, false, data));
                const newFileNodes = files.map((data) => Utils.createNode(id, true, data));
                const newChildren = newDirNodes.concat(newFileNodes);
                const added = newChildren.filter((c) => !parent.children.find((o) => Utils.compareObjects(o.data, c.data)));
                const removed = parent.children.filter((o) => !newChildren.find((c) => Utils.compareObjects(o.data, c.data)));

                removed.forEach((c) => {
                    const index = parent.children.findIndex((o) => o.id === c.id);
                    parent.children.splice(index, 1);
                    delete this.flatPointers[c.id];
                });

                added.forEach((c) => {
                    parent.children.push(c);
                    this.flatPointers[c.id] = c;
                });

                const nodeChildren = parent.children.filter((c) => !c.isLeaf);
                const leafChildren = parent.children.filter((c) => c.isLeaf);
                parent.children = nodeChildren.concat(leafChildren);

                this.root$$.next(this.internalTree);
            })
        );
    }
}
