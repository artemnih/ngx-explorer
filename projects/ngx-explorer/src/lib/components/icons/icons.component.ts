import { Component, ViewEncapsulation } from '@angular/core';
import { NodeType } from '../../common/types';
import { ExplorerService } from '../../services/explorer.service';
import { HelperService } from '../../services/helper.service';
import { BaseView } from '../base-view/base-view.directive';

@Component({
    selector: 'nxe-icons',
    templateUrl: './icons.component.html',
    styleUrls: ['./icons.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class IconsComponent extends BaseView {
    
    // TODO: get rid of node.type
    public readonly icons = {
        [NodeType.Folder]: 'fa fa-folder-o',
        [NodeType.File]: 'fa fa-file-o',
    }
    
    constructor(explorerService: ExplorerService, helperService: HelperService) {
        super(explorerService, helperService);
    }

}

