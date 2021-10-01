import { Component, OnInit } from '@angular/core';
import { NgxExplorerService } from '../../services/ngx-explorer.service';

@Component({
    selector: 'nxe-explorer',
    templateUrl: './explorer.component.html',
    styleUrls: ['./explorer.component.scss']
})
export class ExplorerComponent implements OnInit {

    constructor(private explorerService: NgxExplorerService) { }

    ngOnInit(): void {
    }

    back() {
        const currentNode = this.explorerService.openedNode.value;
        this.explorerService.openNode(currentNode.parentId);
    }

}
