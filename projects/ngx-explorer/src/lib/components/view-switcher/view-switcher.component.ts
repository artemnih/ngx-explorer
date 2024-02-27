import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { View } from '../../shared/types';
import { CURRENT_VIEW, VIEWS } from '../../shared/providers';

@Component({
    selector: 'nxe-view-switcher',
    templateUrl: './view-switcher.component.html',
    styleUrls: ['./view-switcher.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
})
export class ViewSwitcherComponent {
    constructor(
        @Inject(CURRENT_VIEW) private currentView: BehaviorSubject<string>,
        @Inject(VIEWS) protected views: View[]
    ) {}

    setView(view: string) {
        this.currentView.next(view);
    }
}
