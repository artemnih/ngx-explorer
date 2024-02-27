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

    private readonly selectedNodes$ = new BehaviorSubject<INode[]>([]);
    private readonly openedNode$ = new BehaviorSubject<INode | undefined>(undefined);
    private readonly tree$ = new BehaviorSubject<INode>(this.internalTree);

    public readonly selectedNodes = this.selectedNodes$.asObservable();
    public readonly openedNode = this.openedNode$.asObservable();
    public readonly tree = this.tree$.asObservable();

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

    public getNode(id: number) {
        return this.flatPointers[id];
    }

    public select(nodes: INode[]) {
        this.selectedNodes$.next(nodes);
    }

    public openNode(id: number) {
        this.getContent(id).subscribe(() => {
            const parent = this.flatPointers[id];
            this.openedNode$.next(parent);
            this.selectedNodes$.next([]);
        });
    }

    public expand(id: number) {
        this.getContent(id).subscribe();
    }

    public createDir(name: string) {
        const parent = this.openedNode$.value;
        this.dataService.createDir(parent!.data, name).subscribe(() => {
            this.refresh();
        });
    }

    public refresh() {
        this.openNode(this.openedNode$.value!.id);
    }

    public rename(name: string) {
        const nodes = this.selectedNodes$.value;
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

    public remove() {
        const selection = this.selectedNodes$.value;
        if (selection.length === 0) {
            throw new Error('Nothing selected to remove');
        }

        const targets = selection.map((node) => this.flatPointers[node.id].data);
        this.dataService.delete(targets).subscribe(() => {
            this.refresh();
        });
    }

    public upload(files: FileList) {
        const node = this.openedNode$.value!;
        this.dataService.uploadFiles(node.data, files).subscribe(() => {
            this.refresh();
        });
    }

    public download() {
        const target = this.selectedNodes$.value[0];
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
                const newFolderNodes = dirs.map((data) => Utils.createNode(id, false, data));
                const newFileNodes = files.map((data) => Utils.createNode(id, true, data));
                const newChildren = newFolderNodes.concat(newFileNodes);
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

                this.tree$.next(this.internalTree);
            })
        );
    }
}
