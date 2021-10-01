import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Dictionary } from '../interfaces/dictionary.interface';
import { NxeNode } from '../interfaces/nxe-node.interface';
import { Utils } from '../shared/utils';
import { ExampleDataService } from './example-data.service';

@Injectable({
    providedIn: 'root'
})
export class ExplorerService {
    public readonly selectedNodes = new BehaviorSubject<NxeNode[]>([]);
    public readonly openedNode = new BehaviorSubject<NxeNode>(undefined);

    private tree = Utils.createNode('', 'root');
    private flatPointers: Dictionary<NxeNode> = Utils.getHashMap(this.tree);

    constructor(private dataService: ExampleDataService) {
        this.openNode(this.tree.id);
    }

    public selectNodes(nodes: NxeNode[]) {
        this.selectedNodes.next(nodes);
    }

    public openNode(nodeId: string) {
        const parent = this.flatPointers[nodeId];
        parent.children = this.dataService.getNodeChildren(parent.data).map((data, i) => Utils.createNode(nodeId, i, data));
        this.flatPointers = Utils.getHashMap(this.tree);
        this.openedNode.next(parent);
        // TODO: update enitre tree
        // TODO: update selected nodes: parent node should be selected
    }
}

// TODO: navigateToNode // -- later feature for left nav
// TODO: expandNode // --- later feature for left nav
// TODO: collapseNode // --- later feature for left nav