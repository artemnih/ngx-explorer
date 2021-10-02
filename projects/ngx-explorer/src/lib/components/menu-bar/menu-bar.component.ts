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

        // TODO: inject custom popup, inject custom text
        let name = prompt("Enter new folder name");
        if (name) {
            this.explorerService.createNode(currentNode, name);
        }
    }

    refresh() {
        this.explorerService.refresh();
    }

}
