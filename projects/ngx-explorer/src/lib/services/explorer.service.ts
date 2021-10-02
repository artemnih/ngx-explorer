import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { NxeNode, Dictionary, NodeContent } from '../common/types';
import { Utils } from '../shared/utils';
import { ExampleDataService } from './example-data.service';

@Injectable({
    providedIn: 'root'
})
export class ExplorerService {
    public readonly selectedNodes = new BehaviorSubject<NxeNode[]>([]);
    public readonly openedNode = new BehaviorSubject<NxeNode>(undefined);

    private tree = Utils.createNode();
    private flatPointers: Dictionary<NxeNode> = Utils.getHashMap(this.tree);

    constructor(private dataService: ExampleDataService) {
        this.openNode(this.tree.id);
    }

    public selectNodes(nodes: NxeNode[]) {
        this.selectedNodes.next(nodes);
    }

    public openNode(nodeId: string) {
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

    public createNode(parentNode: NxeNode, name: string) {
        const parent = this.flatPointers[parentNode.id];
        this.dataService.createNode(parent.data, name).subscribe(() => {
            // as option, get new data and insert into children
            this.refresh();
        })
    }

    public refresh() {
        this.openNode(this.openedNode.value.id); // TODO: temp, until left nav is done
    }

}

// TODO: navigateToNode // -- later feature for left nav
// TODO: expandNode // --- later feature for left nav
// TODO: collapseNode // --- later feature for left nav