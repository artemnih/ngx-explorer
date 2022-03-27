import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { XNode, Dictionary, NodeContent } from '../common/types';
import { Utils } from '../shared/utils';
import { DataService } from './data.service';
import { HelperService } from './helper.service';

@Injectable({
    providedIn: 'root'
})
export class ExplorerService {
    private internalTree = Utils.createNode();
    private flatPointers: Dictionary<XNode> = { [this.internalTree.id]: this.internalTree };

    private readonly selectedNodes$ = new BehaviorSubject<XNode[]>([]);
    private readonly openedNode$ = new BehaviorSubject<XNode>(undefined);
    private readonly breadcrumbs$ = new BehaviorSubject<XNode[]>([]);
    private readonly tree$ = new BehaviorSubject<XNode>(this.internalTree);

    public readonly selectedNodes = this.selectedNodes$.asObservable();
    public readonly openedNode = this.openedNode$.asObservable();
    public readonly breadcrumbs = this.breadcrumbs$.asObservable();
    public readonly tree = this.tree$.asObservable();

    constructor(private dataService: DataService, private helper: HelperService) {
        this.openNode(this.internalTree.id);
    }

    public selectNodes(nodes: XNode[]) {
        this.selectedNodes$.next(nodes);
    }

    public openNode(id: number) {
        this.getNodeChildren(id).subscribe(() => {
            const parent = this.flatPointers[id];
            this.openedNode$.next(parent);
            const breadcrumbs = Utils.buildBreadcrumbs(this.flatPointers, parent);
            this.breadcrumbs$.next(breadcrumbs);
            this.selectedNodes$.next([]);
        });
    }

    public expandNode(id: number) {
        this.getNodeChildren(id).subscribe();
    }

    public createNode(name: string) {
        const parent = this.openedNode$.value;
        this.dataService.createNode(parent.data, name).subscribe(() => {
            this.refresh();
        });
    }

    public refresh() {
        this.openNode(this.openedNode$.value.id);
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
        if (node.isLeaf) {
            this.dataService.renameLeaf(node.data, name).subscribe(() => {
                this.refresh();
            });
        } else {
            this.dataService.renameNode(node.data, name).subscribe(() => {
                this.refresh();
            });
        }
    }

    public remove() {
        const selection = this.selectedNodes$.value;
        if (selection.length === 0) {
            throw new Error('Nothing selected to remove');
        }

        const targets = selection.map(node => this.flatPointers[node.id]);
        const nodes = targets.filter(t => !t.isLeaf).map(data => data.data);
        const leafs = targets.filter(t => t.isLeaf).map(data => data.data);

        const sub1 = nodes.length ? this.dataService.deleteNodes(nodes) : of([]);
        const sub2 = leafs.length ? this.dataService.deleteLeafs(leafs) : of([]);

        forkJoin([sub1, sub2]).subscribe(() => {
            this.refresh();
        });
    }

    public upload(files: File[]) {
        const node = this.openedNode$.value;
        this.dataService.uploadFiles(node.data, files).subscribe(() => {
            this.refresh();
        });
    }

    public download() {
        const target = this.selectedNodes$.value[0];
        this.dataService.download(target.data).subscribe(() => {
            this.refresh();
        });
    }

    private getNodeChildren(id: number) {
        const parent = this.flatPointers[id];
        if (parent.isLeaf) {
            throw new Error('Cannot open leaf node');
        }

        return this.dataService
            .getNodeChildren(parent.data)
            .pipe(tap(({ leafs, nodes }: NodeContent<any>) => {
                const newNodes = nodes.map(data => Utils.createNode(id, false, data));
                const newLeafs = leafs.map(data => Utils.createNode(id, true, data));
                const newChildren = newNodes.concat(newLeafs);
                const added = newChildren.filter(c => !parent.children.find(o => Utils.compareObjects(o.data, c.data)));
                const removed = parent.children.filter(o => !newChildren.find(c => Utils.compareObjects(o.data, c.data)));

                removed.forEach(c => {
                    const index = parent.children.findIndex(o => o.id === c.id);
                    parent.children.splice(index, 1);
                    delete this.flatPointers[c.id];
                });

                added.forEach(c => {
                    parent.children.push(c);
                    this.flatPointers[c.id] = c;
                });

                parent.children.sort((a, b) => a.data.name.localeCompare(b.data.name));
                const nodeChildren = parent.children.filter(c => !c.isLeaf);
                const leafChildren = parent.children.filter(c => c.isLeaf);
                parent.children = nodeChildren.concat(leafChildren);

                this.tree$.next(this.internalTree);
            }));
    }

}
