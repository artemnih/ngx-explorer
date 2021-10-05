import { Component } from '@angular/core';
import { BaseView } from '../../common/base-view';
import { ExplorerService } from '../../services/explorer.service';
import { HelperService } from '../../services/helper.service';

@Component({
    selector: 'nxe-icons',
    templateUrl: './icons.component.html',
    styleUrls: ['./icons.component.scss']
})
export class IconsComponent extends BaseView {
    constructor(explorerService: ExplorerService, helperService: HelperService) {
        super(explorerService, helperService);
    }
}

