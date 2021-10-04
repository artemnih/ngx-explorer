import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, of } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { XNode, Dictionary, NodeContent } from '../common/types';
import { Utils } from '../shared/utils';
import { ExampleDataService } from './example-data.service';

@Injectable({
    providedIn: 'root'
})
export class ExplorerService {
    public readonly selectedNodes = new BehaviorSubject<XNode[]>([]);
    public readonly openedNode = new BehaviorSubject<XNode>(undefined);

    private tree = Utils.createNode();
    private flatPointers: Dictionary<XNode> = Utils.getHashMap(this.tree);

    constructor(private dataService: ExampleDataService) {
        this.openNode(this.tree);
    }

    public getNode(nodeId: string) {
        // TODO: this should be immutable
        return this.flatPointers[nodeId];
    }

    public selectNodes(nodes: XNode[]) {
        this.selectedNodes.next(nodes);
    }

    public openNode(node: XNode) {
        const nodeId = node.id;
        const parent = this.flatPointers[nodeId];

        if (parent.isLeaf) {
            throw new Error('Cannot open leaf node'); // TODO: temp. download or open file
        }

        this.dataService
            .getNodeChildren(parent.data)
            .subscribe(({ leafs, nodes }: NodeContent) => {
                const childrenNodes = nodes.map(data => Utils.createNode(nodeId, false, data));
                const childrenLeafs = leafs.map(data => Utils.createNode(nodeId, true, data));
                parent.children = childrenNodes.concat(childrenLeafs);
                this.flatPointers = Utils.getHashMap(this.tree);
                this.openedNode.next(parent);
                // TODO: update enitre tree
                // TODO: update selected nodes: parent node should be selected
            });
    }

    public createNode(parentNode: XNode, name: string) {
        const parent = this.flatPointers[parentNode.id];
        this.dataService.createNode(parent.data, name).subscribe(() => {
            // as option, get new data and insert into children
            this.refresh();
        })
    }

    public refresh() {
        this.openNode(this.openedNode.value); // TODO: temp, until left nav is done
    }

    public rename(target: XNode, name: string) {
        const node = this.flatPointers[target.id];
        if (node.isLeaf) {
            this.dataService.renameLeaf(node.data, name).subscribe(() => {
                this.refresh();
            })
        } else {
            this.dataService.renameNode(node.data, name).subscribe(() => {
                this.refresh(); // TODO: refresh entire tree? or all children?
            });
        }
    }

    public remove(selection: XNode[]) {
        const targets = selection.map(node => this.flatPointers[node.id])
        const nodes = targets.filter(t => !t.isLeaf).map(data => data.data);
        const leafs = targets.filter(t => t.isLeaf).map(data => data.data);

        const sub1 = nodes.length ? this.dataService.deleteNodes(nodes) : of([]);
        const sub2 = leafs.length ? this.dataService.deleteLeafs(leafs) : of([]);

        forkJoin([sub1, sub2]).subscribe(() => {
            this.refresh();
        });
    }

    public upload(target: XNode, files: File[]) {
        this.dataService.uploadFiles(target.data, files).subscribe(() => {
            this.refresh();
        });
    }

    public download(node: XNode) {
        const target = this.flatPointers[node.id]
        this.dataService.download(target.data).subscribe(() => {
            this.refresh();
        });
    }

}

// TODO: navigateToNode // -- later feature for left nav
// TODO: expandNode // --- later feature for left nav
// TODO: collapseNode // --- later feature for left nav