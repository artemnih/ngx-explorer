import { Component, OnInit } from '@angular/core';
import { ExplorerService } from '../../services/explorer.service';

@Component({
    selector: 'nxe-explorer',
    templateUrl: './explorer.component.html',
    styleUrls: ['./explorer.component.scss']
})
export class ExplorerComponent implements OnInit {

    constructor(private explorerService: ExplorerService) { }

    ngOnInit(): void { }

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
