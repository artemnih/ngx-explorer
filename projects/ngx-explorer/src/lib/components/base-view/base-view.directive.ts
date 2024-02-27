import { Directive, Inject, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { INode } from '../../shared/types';
import { NAME_FUNCTION } from '../../shared/providers';
import { ExplorerService } from '../../services/explorer.service';

@Directive()
export class BaseView implements OnDestroy {
    protected selection = new Set<number>();
    protected items: INode[] = [];
    protected dragging = false;
    protected subs = new Subscription();
    protected shiftSelectionStartId: number | undefined;

    constructor(
        protected explorerService: ExplorerService,
        @Inject(NAME_FUNCTION) protected getName: (node: INode) => string
    ) {
        this.subs.add(
            this.explorerService.openedNode.subscribe((nodes) => {
                this.items = nodes ? nodes.children : [];
            })
        );

        this.subs.add(
            this.explorerService.selectedNodes.subscribe((nodes) => {
                this.selection.clear();
                if (nodes) {
                    this.selection = new Set(nodes.map((n) => n.id));
                }
            })
        );
    }

    select(event: MouseEvent, item: INode) {
        const shiftKeyPressed = event.shiftKey;
        const metaKeyPressed = event.metaKey || event.ctrlKey;

        if (shiftKeyPressed) {
            if (this.selection.size === 0) {
                this.selection.add(item.id);
                this.shiftSelectionStartId = item.id;
            } else {
                this.selection.clear();
                const headIndex = this.items.findIndex((i) => i.id === this.shiftSelectionStartId);
                const currentIndex = this.items.findIndex((i) => i.id === item.id);

                const start = Math.min(headIndex, currentIndex);
                const end = Math.max(headIndex, currentIndex);

                for (let i = start; i <= end; i++) {
                    this.selection.add(this.items[i].id);
                }
            }
        } else {
            if (metaKeyPressed) {
                if (this.selection.has(item.id)) {
                    this.selection.delete(item.id);
                } else {
                    this.selection.add(item.id);
                }
            } else {
                this.selection.clear();
                this.shiftSelectionStartId = item.id;
                this.selection.add(item.id);
            }
        }
    }

    open(event: MouseEvent, item: INode) {
        const metaKeyPressed = event.metaKey || event.ctrlKey || event.shiftKey;
        if (!metaKeyPressed) {
            this.explorerService.openNode(item.id);
        }
    }

    isSelected(item: INode) {
        return this.selection.has(item.id);
    }

    emptySpaceClick(): void {
        this.explorerService.select([]);
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }
}
