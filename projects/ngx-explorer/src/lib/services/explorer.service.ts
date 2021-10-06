import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, of } from 'rxjs';
import { XNode, Dictionary, NodeContent, NodeType } from '../common/types';
import { Utils } from '../shared/utils';
import { DataService } from './data.service';

@Injectable({
    providedIn: 'root'
})
export class ExplorerService {
    public readonly selectedNodes = new BehaviorSubject<XNode[]>([]);
    public readonly openedNode = new BehaviorSubject<XNode>(undefined);
    public readonly breadcrumbs = new BehaviorSubject<XNode[]>([]);

    private tree = Utils.createNode(NodeType.Folder);
    private flatPointers: Dictionary<XNode> = Utils.getHashMap(this.tree);

    constructor(private dataService: DataService) {
        this.openNode(this.tree.id);
    }

    // TODO: this should not be needed
    public getNode(nodeId: string) {
        // TODO: this should be immutable
        return this.flatPointers[nodeId];
    }

    public selectNodes(nodes: XNode[]) {
        this.selectedNodes.next(nodes);
    }

    public openNode(id: string) {
        const parent = this.flatPointers[id];
        if (parent.isLeaf) {
            throw new Error('Cannot open leaf node'); // TODO: temp. download or open file
        }

        this.dataService
            .getNodeChildren(parent.data)
            .subscribe(({ leafs, nodes }: NodeContent<any>) => {
                const childrenNodes = nodes.map(data => Utils.createNode(NodeType.Folder, id, false, data));
                const childrenLeafs = leafs.map(data => Utils.createNode(NodeType.File, id, true, data));
                parent.children = childrenNodes.concat(childrenLeafs);
                this.flatPointers = Utils.getHashMap(this.tree);
                this.openedNode.next(parent);
                const breadcrumbs = Utils.buildBreadcrumbs(this.flatPointers, parent);
                this.breadcrumbs.next(breadcrumbs);
            });
    }

    public createNode(name: string) {
        const parent = this.openedNode.value;
        this.dataService.createNode(parent.data, name).subscribe(() => {
            // as option, get new data and insert into children
            this.refresh();
        })
    }

    public refresh() {
        this.openNode(this.openedNode.value.id); // TODO: temp, until left nav is done
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
        const target = this.selectedNodes.value[0].data; // TODO: add mutliple selection support
        this.dataService.download(target.data).subscribe(() => {
            this.refresh();
        });
    }

}

// TODO: navigateToNode // -- later feature for left nav
// TODO: expandNode // --- later feature for left nav
// TODO: collapseNode // --- later feature for left nav