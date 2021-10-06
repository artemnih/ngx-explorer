import { Directive, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { XNode } from '../../common/types';
import { ExplorerService } from '../../services/explorer.service';
import { HelperService } from '../../services/helper.service';

@Directive()
export class BaseView implements OnDestroy {
    public selection: XNode[] = [];
    public items: XNode[] = [];
    protected subs = new Subscription();

    constructor(protected explorerService: ExplorerService, protected helperService: HelperService) {
        this.subs.add(this.explorerService.openedNode.subscribe(nodes => {
            this.items = nodes.children;
        }));

        this.subs.add(this.explorerService.selectedNodes.subscribe(nodes => {
            this.selection = nodes;
        }));
    }

    getDisplayName(data) {
        return this.helperService.getName(data);
    }

    select(event: MouseEvent, item: XNode) {
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

    open(event: MouseEvent, item: XNode) {
        const metaKeyPressed = event.metaKey || event.ctrlKey || event.shiftKey;
        if (!metaKeyPressed) {
            this.explorerService.openNode(item.id);
        }
    }

    isSelected(item: XNode) {
        return this.selection.indexOf(item) !== -1;
    }

    emptySpaceClick(): void {
        this.explorerService.selectNodes([]);
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }

}

// TODO: add keyboard events such as Enter, Right, Left, Up, Space etc.
// TODO: figure out custom icons for folders and files
// TODO: allow configurable back icon
// TODO: add button condtions for disable/enable
