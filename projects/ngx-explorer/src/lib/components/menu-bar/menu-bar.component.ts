import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ExplorerService } from '../../services/explorer.service';
import { HelperService } from '../../services/helper.service';

@Component({
    selector: 'nxe-menu-bar',
    templateUrl: './menu-bar.component.html',
    styleUrls: ['./menu-bar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MenuBarComponent {
    @ViewChild('uploader', { static: true }) uploader: ElementRef;

    constructor(private explorerService: ExplorerService, private helperService: HelperService) { }

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
