import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NxeNode } from '../../interfaces/nxe-node.interface';
import { ExplorerService } from '../../services/explorer.service';

@Component({
    selector: 'nxe-icons',
    templateUrl: './icons.component.html',
    styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnDestroy {
    public selection: NxeNode[] = [];
    public items: NxeNode[] = [];
    private subs = new Subscription();

    constructor(private explorerService: ExplorerService) {
        this.subs.add(this.explorerService.openedNode.subscribe(nodes => {
            this.items = nodes.children;
        }));

        this.subs.add(this.explorerService.selectedNodes.subscribe(nodes => {
            this.selection = nodes;
        }));
    }

    // TODO: this should be injectable
    getDisplayName(data: any) {
        return data.name;
    }

    select(event: MouseEvent, item: NxeNode) {
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

    open(event: MouseEvent, item: NxeNode) {
        const metaKeyPressed = event.metaKey || event.ctrlKey || event.shiftKey;
        if (!metaKeyPressed) {
            this.explorerService.openNode(item.id);
        }
    }

    isSelected(item: NxeNode) {
        return this.selection.indexOf(item) !== -1;
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }

}

// TODO: add keyboard events such as Enter, Right, Left, Up, Space etc.
// TODO: figure out custom icons for folders and files
// TODO: allow configurable back icon
