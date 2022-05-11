import { Directive, Inject, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { INode } from '../../common/types';
import { FILTER_STRING } from '../../injection-tokens/current-view.token';
import { ExplorerService } from '../../services/explorer.service';
import { HelperService } from '../../services/helper.service';

@Directive()
export class BaseView implements OnDestroy {
    public selection: INode[] = [];
    public items: INode[] = [];
    public dragging = false;
    protected subs = new Subscription();

    constructor(protected explorerService: ExplorerService, protected helperService: HelperService, @Inject(FILTER_STRING) private filter: BehaviorSubject<string>) {
        this.subs.add(this.explorerService.openedNode.subscribe(nodes => {
            this.items = nodes ? nodes.children : [];
        }));

        this.subs.add(this.explorerService.selectedNodes.subscribe(nodes => {
            this.selection = nodes ? nodes : [];
        }));
    }

    get filteredItems(): INode[] {
        const filter = this.filter.value;
        if (!filter) {
            return this.items;
        }
        return this.items.filter(i => this.helperService.getName(i.data).toLowerCase().includes(filter.toLowerCase()));
    }

    getDisplayName(data) {
        return this.helperService.getName(data);
    }

    select(event: MouseEvent, item: INode) {
        const selectedIndex = this.selection.findIndex(i => i === item);
        const alreadySelected = selectedIndex !== -1;
        const metaKeyPressed = event.metaKey || event.ctrlKey || event.shiftKey;

        if (alreadySelected && metaKeyPressed) {
            this.selection.splice(selectedIndex, 1);
        } else {
            if (!metaKeyPressed) {
                this.selection.length = 0;
            }
            this.selection.push(item);
        }
        this.explorerService.selectNodes(this.selection);
    }

    open(event: MouseEvent, item: INode) {
        const metaKeyPressed = event.metaKey || event.ctrlKey || event.shiftKey;
        if (!metaKeyPressed) {
            this.explorerService.openNode(item.id);
        }
    }

    isSelected(item: INode) {
        return this.selection.indexOf(item) !== -1;
    }

    emptySpaceClick(): void {
        this.explorerService.selectNodes([]);
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }

}
