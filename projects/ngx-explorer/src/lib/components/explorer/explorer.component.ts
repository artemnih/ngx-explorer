import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AvialableView } from '../../shared/types';
import { CURRENT_VIEW } from '../../shared/providers';
import { MenuBarComponent } from '../menu-bar/menu-bar.component';
import { TreeComponent } from '../tree/tree.component';
import { SecondMenuBarComponent } from '../second-menu-bar/second-menu-bar.component';
import { IconsComponent } from '../icons/icons.component';
import { ListComponent } from '../list/list.component';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'nxe-explorer',
    templateUrl: './explorer.component.html',
    styleUrls: ['./explorer.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [AsyncPipe, MenuBarComponent, TreeComponent, SecondMenuBarComponent, IconsComponent, ListComponent]
})
export class ExplorerComponent {
    public avialableView = AvialableView;
    public view$ = this.currentView.asObservable();

    constructor(@Inject(CURRENT_VIEW) private currentView: BehaviorSubject<AvialableView>) {}
}
