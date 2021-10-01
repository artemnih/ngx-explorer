import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Dictionary } from '../interfaces/dictionary.interface';
import { NxeNode } from '../interfaces/nxe-node.interface';
import { ExampleDataService } from './example-data.service';

@Injectable({
    providedIn: 'root'
})
export class NgxExplorerService {

    private tree: NxeNode = {
        id: 'root',
        parentId: null,
        data: undefined,
        children: []
    };
    private flatPointers: Dictionary<NxeNode> = NgxExplorerService.getHashMap(this.tree);

    selectedNodes = new BehaviorSubject<NxeNode[]>([]);
    openedNode = new BehaviorSubject<NxeNode>(undefined);

    constructor(private dataService: ExampleDataService) {
        this.openNode(this.tree.id);
    }

    selectNodes(nodes: NxeNode[]) {
        this.selectedNodes.next(nodes);
    }

    openNode(parentId: string) {

        // find parent reference
        const parent = this.flatPointers[parentId];

        // find children
        const children = this.dataService.getNodeChildren(parent.data).map((child, i) => {
            return {
                id: parentId + '-' + i,
                parentId: parentId,
                data: child,
                children: []
            }
        });

        parent.children = children

        // update flat pointers
        this.flatPointers = NgxExplorerService.getHashMap(this.tree);

        // update opened node
        this.openedNode.next(parent);

        // TODO: update enitre tree
        // this.entireTree.next(this.tree);

        // TODO: update selected nodes: parent node should be selected
    }

    static getHashMap(node: NxeNode, hashMap: Dictionary<NxeNode> = {}) {
        hashMap[node.id] = node;
        const nodes = node.children;
        for (const node of nodes) {
            hashMap[node.id] = node;
            if (node.children && node.children.length) {
                this.getHashMap(node, hashMap);
            }
        }
        return hashMap;
    }
}

// TODO: navigateToNode // -- later feature for left nav
// TODO: expandNode // --- later feature for left nav
// TODO: collapseNode // --- later feature for left nav