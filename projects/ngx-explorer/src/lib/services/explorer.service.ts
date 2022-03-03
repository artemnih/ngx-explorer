import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, of } from 'rxjs';
import { XNode, Dictionary, NodeContent } from '../common/types';
import { Utils } from '../shared/utils';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})
export class ExplorerService {
    private tree = Utils.createNode();
    private flatPointers: Dictionary<XNode> = Utils.getHashMap(this.tree);

    private readonly _selectedNodes = new BehaviorSubject<XNode[]>([]);
    private readonly _openedNode = new BehaviorSubject<XNode>(undefined);
    private readonly _breadcrumbs = new BehaviorSubject<XNode[]>([]);

    public readonly selectedNodes = this._selectedNodes.asObservable();
    public readonly openedNode = this._openedNode.asObservable();
    public readonly breadcrumbs = this._breadcrumbs.asObservable();

    constructor(private dataService: DataService) {
        this.openNode(this.tree.id);
    }

    // TODO: this should not be needed
    public getNode(nodeId: string) {
        // TODO: this should be immutable
        return this.flatPointers[nodeId];
    }

    public selectNodes(nodes: XNode[]) {
        this._selectedNodes.next(nodes);
    }

    public openNode(id: string) {
        const parent = this.flatPointers[id];
        if (parent.isLeaf) {
            throw new Error('Cannot open leaf node'); // TODO: temp. download or open file
        }

        this.dataService
            .getNodeChildren(parent.data)
            .subscribe(({ leafs, nodes }: NodeContent<any>) => {
                const childrenNodes = nodes.map(data => Utils.createNode(id, false, data));
                const childrenLeafs = leafs.map(data => Utils.createNode(id, true, data));
                parent.children = childrenNodes.concat(childrenLeafs);
                this.flatPointers = Utils.getHashMap(this.tree);
                this._openedNode.next(parent);
                const breadcrumbs = Utils.buildBreadcrumbs(this.flatPointers, parent);
                this._breadcrumbs.next(breadcrumbs);
                this._selectedNodes.next([]);
            });
    }

    public createNode(name: string) {
        const parent = this._openedNode.value;
        this.dataService.createNode(parent.data, name).subscribe(() => {
            // as option, get new data and insert into children
            this.refresh();
        })
    }

    public refresh() {
        this.openNode(this._openedNode.value.id); // TODO: temp, until left nav is done
    }

    public rename(name: string) {
        const nodes = this._selectedNodes.value;
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
        const selection = this._selectedNodes.value;
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
        const node = this._openedNode.value;
        this.dataService.uploadFiles(node.data, files).subscribe(() => {
            this.refresh();
        });
    }

    public download() {
        const target = this._selectedNodes.value[0]; // TODO: add mutliple selection support
        this.dataService.download(target.data).subscribe(() => {
            this.refresh();
        });
    }

}

// TODO: navigateToNode // -- later feature for left nav
// TODO: expandNode // --- later feature for left nav
// TODO: collapseNode // --- later feature for left nav