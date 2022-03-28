import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { INode } from '../../common/types';
import { FILTER_STRING } from '../../injection-tokens/current-view.token';
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

    constructor(explorerService: ExplorerService, helperService: HelperService, @Inject(FILTER_STRING) private filter: BehaviorSubject<string>) {
        super(explorerService, helperService);
    }

    get filteredItems(): INode[] {
        const filter = this.filter.value;
        if (!filter) {
            return this.items;
        }
        return this.items.filter(i => this.helperService.getName(i.data).toLowerCase().includes(filter.toLowerCase()));
    }

}

