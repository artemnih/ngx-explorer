import { Component, ViewEncapsulation } from '@angular/core';
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

    public readonly icons = {
        node: 'fa fa-folder-o',
        leaf: 'fa fa-file-o',
    };

    constructor(explorerService: ExplorerService, helperService: HelperService) {
        super(explorerService, helperService);
    }

}

