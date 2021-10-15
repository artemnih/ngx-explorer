import { Component, ViewEncapsulation } from '@angular/core';
import { XNode } from 'ngx-explorer';
import { ExplorerService } from '../../services/explorer.service';
import { filter } from 'rxjs/operators';
import { HelperService } from '../../services/helper.service';

interface TreeNode extends XNode {
    children: TreeNode[];
    expanded: boolean;
}

@Component({
    selector: 'nxe-tree',
    templateUrl: './tree.component.html',
    styleUrls: ['./tree.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class TreeComponent {
    public treeNodes: any = [];
    private expandedIds: string[] = [];

    constructor(private explorerService: ExplorerService, private helperService: HelperService) {
        this.explorerService.tree.pipe(filter(x => !!x)).subscribe(node => {
            this.addExpandedNode(node.id); // always expand root
            this.treeNodes = this.buildTree(node).children;
        });
    }

    open(node: XNode) {
        this.addExpandedNode(node.id);
        this.explorerService.openNode(node.id);
    }

    expand(node: XNode) {
        this.addExpandedNode(node.id);
        this.explorerService.expand(node.id);
    }

    collapse(node: XNode) {
        this.removeExpandedNode(node.id);
        const n = this.explorerService.tree.value;
        this.treeNodes = this.buildTree(n).children;
    }

    getName(node: XNode) {
        return this.helperService.getName(node);
    }

    private buildTree(node: XNode): TreeNode {
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

    private addExpandedNode(id: string) {
        const index = this.expandedIds.indexOf(id);
        if (index === -1) {
            this.expandedIds.push(id);
        }
    }

    private removeExpandedNode(id: string) {
        const index = this.expandedIds.indexOf(id);
        this.expandedIds.splice(index, 1);
    }

}
