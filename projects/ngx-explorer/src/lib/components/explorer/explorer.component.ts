import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AvialableView } from '../../common/types';
import { CURRENT_VIEW } from '../../injection-tokens/current-view.token';

@Component({
    selector: 'nxe-explorer',
    templateUrl: './explorer.component.html',
    styleUrls: ['./explorer.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ExplorerComponent {

    public avialableView = AvialableView;
    public view: string;

    constructor(@Inject(CURRENT_VIEW) private currentView: BehaviorSubject<AvialableView>) {
        this.currentView.subscribe(view => {
            this.view = view;
        })
    }

}
