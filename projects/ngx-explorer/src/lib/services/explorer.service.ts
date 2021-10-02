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
            throw new Error('Cannot open leaf node');
        }

        this.dataService
            .getNodeChildren(parent.data)
            .subscribe(({ files, folders }: NodeContent) => {
                const childrenFolders = folders.map(data => Utils.createNode(nodeId, false, data));
                const childrenFiles = files.map(data => Utils.createNode(nodeId, true, data));
                parent.children = childrenFolders.concat(childrenFiles);
                this.flatPointers = Utils.getHashMap(this.tree);
                this.openedNode.next(parent);
                // TODO: update enitre tree
                // TODO: update selected nodes: parent node should be selected
            });
    }
}

// TODO: navigateToNode // -- later feature for left nav
// TODO: expandNode // --- later feature for left nav
// TODO: collapseNode // --- later feature for left nav