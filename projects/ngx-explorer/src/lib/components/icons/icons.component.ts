import { Component } from '@angular/core';
import { BaseView } from '../../common/base-view';
import { NodeType } from '../../common/types';
import { ExplorerService } from '../../services/explorer.service';
import { HelperService } from '../../services/helper.service';

@Component({
    selector: 'nxe-icons',
    templateUrl: './icons.component.html',
    styleUrls: ['./icons.component.scss']
})
export class IconsComponent extends BaseView {
    
    public readonly icons = {
        [NodeType.Folder]: 'fa fa-folder-o',
        [NodeType.File]: 'fa fa-file-o',
    }
    
    constructor(explorerService: ExplorerService, helperService: HelperService) {
        super(explorerService, helperService);
    }
}

