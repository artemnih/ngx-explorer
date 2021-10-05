import { Component, ElementRef, ViewChild } from '@angular/core';
import { ExplorerService } from '../../services/explorer.service';
import { HelperService } from '../../services/helper.service';

@Component({
    selector: 'nxe-menu-bar',
    templateUrl: './menu-bar.component.html',
    styleUrls: ['./menu-bar.component.scss']
})
export class MenuBarComponent {
    @ViewChild('uploader', { static: true }) uploader: ElementRef;

    constructor(private explorerService: ExplorerService, private helperService: HelperService) { }

    back() {
        const currentNode = this.explorerService.openedNode.value;
        this.explorerService.openNode(currentNode.parentId);
    }

    createFolder() {
        const name = prompt("Enter new folder name");
        if (name) {
            this.explorerService.createNode(name);
        }
    }

    refresh() {
        this.explorerService.refresh();
    }

    rename() {
        const selection = this.explorerService.selectedNodes.value;
        if (selection.length === 1) {
            const oldName = this.helperService.getName(selection[0].data);
            const newName = prompt("Enter new name", oldName);
            if (newName) {
                this.explorerService.rename(newName);
            }
        }
    }

    remove() {
        this.explorerService.remove();
    }

    openUploader() {
        this.uploader.nativeElement.click();
    }

    handleFiles(files: File[]) {
        this.explorerService.upload(files);
        this.uploader.nativeElement.value = '';
    }

    download() {
        this.explorerService.download();
    }

}
