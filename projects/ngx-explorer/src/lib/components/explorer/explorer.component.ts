import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { View } from '../../shared/types';
import { CURRENT_VIEW, VIEWS } from '../../shared/providers';
import { MenuBarComponent } from '../menu-bar/menu-bar.component';
import { TreeComponent } from '../tree/tree.component';
import { SecondMenuBarComponent } from '../second-menu-bar/second-menu-bar.component';
import { IconsComponent } from '../icons/icons.component';
import { ListComponent } from '../list/list.component';
import { AsyncPipe, NgComponentOutlet } from '@angular/common';

@Component({
    selector: 'nxe-explorer',
    templateUrl: './explorer.component.html',
    styleUrls: ['./explorer.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [AsyncPipe, MenuBarComponent, TreeComponent, SecondMenuBarComponent, IconsComponent, ListComponent, NgComponentOutlet]
})
export class ExplorerComponent {
    public viewComponent$ = this.currentView$.pipe(map((view) => this.views.find((v) => v.name === view)!.component));

    constructor(
        @Inject(CURRENT_VIEW) private currentView$: BehaviorSubject<string>,
        @Inject(VIEWS) protected views: View[],
    ) { }
}
