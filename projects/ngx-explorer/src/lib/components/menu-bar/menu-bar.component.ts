import { Component, ElementRef, OnDestroy, ViewChild, ViewEncapsulation } from '@angular/core';
import { NodeType } from 'ngx-explorer';
import { Subscription } from 'rxjs';
import { ExplorerService } from '../../services/explorer.service';
import { HelperService } from '../../services/helper.service';

@Component({
    selector: 'nxe-menu-bar',
    templateUrl: './menu-bar.component.html',
    styleUrls: ['./menu-bar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MenuBarComponent implements OnDestroy {
    @ViewChild('uploader', { static: true }) uploader: ElementRef;

    canDownload = false;
    canDelete = false;
    canRename = false;

    private sub = new Subscription();

    constructor(private explorerService: ExplorerService, private helperService: HelperService) {
        this.sub.add(this.explorerService.selectedNodes.subscribe(n => {
            this.canDownload = n.filter(x => x.type === NodeType.File).length === 1;
            this.canDelete = n.length > 0;
            this.canRename = n.length === 1;
        }));
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
        if (confirm("Are you sure you want to delete the selected files?")) {
            this.explorerService.remove();
        }
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

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
