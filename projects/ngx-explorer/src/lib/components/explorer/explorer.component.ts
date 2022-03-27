import { Component, Inject, OnDestroy, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AvialableView } from '../../common/types';
import { CURRENT_VIEW } from '../../injection-tokens/current-view.token';

@Component({
    selector: 'nxe-explorer',
    templateUrl: './explorer.component.html',
    styleUrls: ['./explorer.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ExplorerComponent implements OnDestroy {

    public avialableView = AvialableView;
    public view: string;
    private sub = new Subscription();

    constructor(@Inject(CURRENT_VIEW) private currentView: BehaviorSubject<AvialableView>) {
        this.sub.add(this.currentView.subscribe(view => {
            this.view = view;
        }));
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
