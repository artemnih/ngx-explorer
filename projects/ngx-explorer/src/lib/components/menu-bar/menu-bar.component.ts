import { Component } from '@angular/core';
import { ExplorerService } from '../../services/explorer.service';

@Component({
    selector: 'nxe-menu-bar',
    templateUrl: './menu-bar.component.html',
    styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent {

    constructor(private explorerService: ExplorerService) { }

    back() {
        const currentNode = this.explorerService.openedNode.value;
        this.explorerService.openNode(currentNode.parentId);
    }

    createFolder() {
        const currentNode = this.explorerService.openedNode.value;
        const name = prompt("Enter new folder name");
        if (name) {
            this.explorerService.createNode(currentNode, name);
        }
        // TODO: inject custom popup, inject custom text

    }

    refresh() {
        this.explorerService.refresh();
    }

    rename() {
        const selection = this.explorerService.selectedNodes.value;
        if (selection.length === 1) {

            // TODO: inject getName
            const newName = prompt("Enter new name", selection[0].data.name);
            if (newName) {
                this.explorerService.rename(selection[0], newName);
            }
        }
    }

}
