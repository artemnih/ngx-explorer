import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { XNode, Dictionary, NodeContent } from '../common/types';
import { Utils } from '../shared/utils';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})
export class ExplorerService {
    public readonly selectedNodes = new BehaviorSubject<XNode[]>([]);
    public readonly openedNode = new BehaviorSubject<XNode>(undefined);
    public readonly breadcrumbs = new BehaviorSubject<XNode[]>([]);
    public readonly tree = new BehaviorSubject<XNode>(undefined);

    private internalTree = Utils.createNode();
    private flatPointers: Dictionary<XNode> = Utils.getHashMap(this.internalTree);

    constructor(private dataService: DataService) {
        this.openNode(this.internalTree.id);
    }

    public selectNodes(nodes: XNode[]) {
        this.selectedNodes.next(nodes);
    }

    public openNode(id: string) {
        const parent = this.flatPointers[id];
        this.openedNode.next(parent);
        
        this.getNodeChildren(id).subscribe(() => {
            const breadcrumbs = Utils.buildBreadcrumbs(this.flatPointers, parent);
            this.breadcrumbs.next(breadcrumbs);
            this.selectedNodes.next([]);
            this.tree.next(this.internalTree);
        });
    }

    public expand(id: string) {
        this.getNodeChildren(id).subscribe(() => {
            this.tree.next(this.internalTree);
        });
    }

    public createNode(name: string) {
        const parent = this.openedNode.value;
        this.dataService.createNode(parent.data, name).subscribe(() => {
            this.refresh();
        })
    }

    public refresh() {
        this.openNode(this.openedNode.value.id);
    }

    public rename(name: string) {
        const nodes = this.selectedNodes.value;
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
            })
        } else {
            this.dataService.renameNode(node.data, name).subscribe(() => {
                this.refresh();
            });
        }
    }

    public remove() {
        const selection = this.selectedNodes.value;
        if (selection.length === 0) {
            throw new Error('Nothing selected to remove');
        }

        const targets = selection.map(node => this.flatPointers[node.id])
        const nodes = targets.filter(t => !t.isLeaf).map(data => data.data);
        const leafs = targets.filter(t => t.isLeaf).map(data => data.data);

        const sub1 = nodes.length ? this.dataService.deleteNodes(nodes) : of([]);
        const sub2 = leafs.length ? this.dataService.deleteLeafs(leafs) : of([]);

        forkJoin([sub1, sub2]).subscribe(() => {
            this.refresh();
        });
    }

    public upload(files: File[]) {
        const node = this.openedNode.value;
        this.dataService.uploadFiles(node.data, files).subscribe(() => {
            this.refresh();
        });
    }

    public download() {
        const target = this.selectedNodes.value[0]; // TODO: add mutliple selection support
        this.dataService.download(target.data).subscribe(() => {
            this.refresh();
        });
    }

    private getNodeChildren(id: string) {
        const parent = this.flatPointers[id];

        if (parent.isLeaf) {
            throw new Error('Cannot open leaf node'); // TODO: temp. download or open file
        }

        return this.dataService
            .getNodeChildren(parent.data).pipe(map(({ leafs, nodes }: NodeContent<any>) => {
                const childrenNodes = nodes.map(data => Utils.createNode(id, false, data));
                const childrenLeafs = leafs.map(data => Utils.createNode(id, true, data));
                parent.children = childrenNodes.concat(childrenLeafs);
                this.flatPointers = Utils.getHashMap(this.internalTree);
            }));
    }

}
