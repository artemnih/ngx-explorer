import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgxExplorerService } from '../ngx-explorer.service';

@Component({
    selector: 'nxe-icons',
    templateUrl: './icons.component.html',
    styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnDestroy {
    public selection: string[] = [];
    public items: string[] = [];
    private subs = new Subscription();

    constructor(private explorerService: NgxExplorerService) {
        this.subs.add(this.explorerService.nodes.subscribe(nodes => {
            this.items = nodes;
        }));

        this.subs.add(this.explorerService.selectedNodes.subscribe(nodes => {
            this.selection = nodes;
        }));
    }

    select(event: MouseEvent, item: string) {
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

    open(event: MouseEvent, item: string) {
        const metaKeyPressed = event.metaKey || event.ctrlKey || event.shiftKey;
        if (!metaKeyPressed) {
            this.explorerService.openNode(item);
        }
    }

    isSelected(item: string) {
        return this.selection.indexOf(item) !== -1;
    }

    ngOnDestroy() {
        this.subs.unsubscribe();
    }

}
