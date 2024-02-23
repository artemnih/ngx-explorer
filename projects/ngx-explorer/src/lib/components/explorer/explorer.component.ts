import { Component, Inject, OnDestroy, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AvialableView } from '../../shared/types';
import { CURRENT_VIEW } from '../../shared/providers';
import { MenuBarComponent } from '../menu-bar/menu-bar.component';
import { TreeComponent } from '../tree/tree.component';
import { SecondMenuBarComponent } from '../second-menu-bar/second-menu-bar.component';
import { IconsComponent } from '../icons/icons.component';
import { ListComponent } from '../list/list.component';

@Component({
    selector: 'nxe-explorer',
    templateUrl: './explorer.component.html',
    styleUrls: ['./explorer.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [MenuBarComponent, TreeComponent, SecondMenuBarComponent, IconsComponent, ListComponent]
})
export class ExplorerComponent implements OnDestroy {

    public avialableView = AvialableView;
    public view?: string;
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
