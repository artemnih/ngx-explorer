import { Component, Inject, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ExplorerService } from '../../services/explorer.service';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { INode } from '../../shared/types';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { NAME_FUNCTION } from '../../shared/providers';

@Component({
    selector: 'nxe-tree',
    templateUrl: './tree.component.html',
    styleUrls: ['./tree.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [NgTemplateOutlet, NgClass],
})
export class TreeComponent implements OnDestroy {
    protected treeNodes: INode[] = [];
    protected expnadedIds = new Set<number>();
    protected selectedId = -1;
    private sub = new Subscription();

    constructor(
        private explorerService: ExplorerService,
        @Inject(NAME_FUNCTION) protected getName: (node: INode) => string
    ) {
        this.sub.add(
            this.explorerService.tree.pipe(filter((x) => !!x)).subscribe((root) => {
                this.expnadedIds.add(root.id); // always expand root
                this.treeNodes = this.buildTree(root).children;
            })
        );

        this.sub.add(
            this.explorerService.openedNode.pipe(filter((x) => !!x)).subscribe((node) => {
                this.selectedId = node!.id;
            })
        );
    }

    open(node: INode) {
        this.selectedId = node.id;
        this.explorerService.openNode(node.id);
    }

    expand(node: INode) {
        this.expnadedIds.add(node.id);
        this.explorerService.expand(node.id);
    }

    collapse(node: INode) {
        this.expnadedIds.delete(node.id);
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    private buildTree(node: INode): INode {
        const { id, parentId, data, isLeaf, children } = node;
        const treeNode = {
            id,
            parentId,
            data,
            isLeaf,
            children: [],
        } as INode;

        if (this.expnadedIds.has(node.id)) {
            treeNode.children = children.filter((x) => !x.isLeaf).map((x) => this.buildTree(x));
        }

        return treeNode;
    }
}
