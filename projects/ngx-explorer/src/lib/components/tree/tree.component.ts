import { Component } from '@angular/core';
import { XNode } from 'ngx-explorer';
import { ExplorerService } from '../../services/explorer.service';
import { filter } from 'rxjs/operators';

interface TreeNode extends XNode {
    children: TreeNode[];
    expanded: boolean;
}

@Component({
    selector: 'nxe-tree',
    templateUrl: './tree.component.html',
    styleUrls: ['./tree.component.scss']
})
export class TreeComponent {
    public tempNodes: any = [];
    private expandedIds: string[] = [];
    public selectedId = null;

    constructor(private explorerService: ExplorerService) {
        this.explorerService.tree.pipe(filter(x => !!x)).subscribe(n => {
            this.addExpandedNode(n); // always expand root
            this.tempNodes = this.buildTree(n).children;
        });
    }

    buildTree(node: XNode): TreeNode {
        const treeNode = {
            id: node.id,
            parentId: node.parentId,
            data: node.data,
            isLeaf: node.isLeaf,
            children: [],
            expanded: false
        } as TreeNode;

        treeNode.expanded = this.expandedIds.indexOf(node.id) > -1;
        if (treeNode.expanded) {
            treeNode.children = node.children.filter(x => !x.isLeaf).map(x => this.buildTree(x));
        }
        return treeNode;
    }

    select(node: XNode) {
        this.selectedId = node.id;
    }

    expand(node: XNode) {
        this.addExpandedNode(node);
        this.explorerService.expand(node.id);
    }

    collapse(node: XNode) {
        const index = this.expandedIds.indexOf(node.id);
        this.expandedIds.splice(index, 1);
        const n = this.explorerService.tree.value;
        this.tempNodes = this.buildTree(n).children;
    }

    private addExpandedNode(node: XNode) {
        const index = this.expandedIds.indexOf(node.id);
        if (index === -1) {
            this.expandedIds.push(node.id);
        }
    }

    // on tree update - update the expanded state. 
    // current node opened - expand all parents
}
