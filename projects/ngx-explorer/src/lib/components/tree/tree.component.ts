import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ExplorerService } from '../../services/explorer.service';
import { filter, take, tap } from 'rxjs/operators';
import { HelperService } from '../../services/helper.service';
import { Subscription } from 'rxjs';
import { INode } from '../../shared/types';
import { NgClass, NgTemplateOutlet } from '@angular/common';

interface TreeNode extends INode {
    children: TreeNode[];
    expanded: boolean;
    selected: boolean;
}

@Component({
    selector: 'nxe-tree',
    templateUrl: './tree.component.html',
    styleUrls: ['./tree.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [NgTemplateOutlet, NgClass]
})
export class TreeComponent implements OnDestroy {
    public treeNodes: TreeNode[] = [];
    private expandedIds: number[] = [];
    public selectedId = -1;
    private sub = new Subscription();
    private pointers: { [id: number]: TreeNode } = {};

    constructor(private explorerService: ExplorerService, private helperService: HelperService) {
        this.sub.add(this.explorerService.tree.pipe(filter(x => !!x)).subscribe(root => {
            this.addExpandedNode(root.id); // always expand root
            this.treeNodes = this.buildTree(root).children;
        }));

        this.sub.add(this.explorerService.openedNode.pipe(filter(x => !!x)).subscribe(node => {
            if (this.selectedId > -1) {
                this.pointers[this.selectedId].selected = false;
            }

            if (node) {
                this.selectedId = node.id;
                this.addExpandedNode(node.id);
                this.pointers[node.id].selected = true;
            }
        }));
    }

    open(node: TreeNode) {
        this.selectedId = node.id;
        this.addExpandedNode(node.id);
        this.explorerService.openNode(node.id);
    }

    expand(node: TreeNode) {
        this.addExpandedNode(node.id);
        this.explorerService.expand(node.id);
    }

    collapse(node: TreeNode) {
        this.removeExpandedNode(node.id);
        this.explorerService.tree.pipe(
            take(1),
            filter(x => !!x)),
            tap((x: INode) => this.buildTree(x));
    }

    getName(node: TreeNode) {
        return this.helperService.getName(node);
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    private buildTree(node: INode): TreeNode {
        const { id, parentId, data, isLeaf, children } = node;
        const treeNode = {
            id,
            parentId,
            data,
            isLeaf,
            children: [],
            expanded: false,
            selected: this.selectedId === id
        } as TreeNode;
        this.pointers[node.id] = treeNode;

        treeNode.expanded = this.expandedIds.indexOf(id) > -1;
        if (treeNode.expanded) {
            treeNode.children = children.filter(x => !x.isLeaf).map(x => this.buildTree(x));
        }
        return treeNode;
    }

    private addExpandedNode(id: number) {
        const index = this.expandedIds.indexOf(id);
        if (index === -1) {
            this.expandedIds.push(id);
        }
    }

    private removeExpandedNode(id: number) {
        const index = this.expandedIds.indexOf(id);
        this.expandedIds.splice(index, 1);
    }

}
