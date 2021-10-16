import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { AvialableView } from 'ngx-explorer';
import { BehaviorSubject } from 'rxjs';
import { CURRENT_VIEW } from '../../injection-tokens/current-view.token';

@Component({
    selector: 'nxe-view-switcher',
    templateUrl: './view-switcher.component.html',
    styleUrls: ['./view-switcher.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ViewSwitcherComponent {

    public avialableView = AvialableView;

    constructor(@Inject(CURRENT_VIEW) private currentView: BehaviorSubject<AvialableView>) {
    }

    setView(view: AvialableView) {
        this.currentView.next(view);
    }

}
