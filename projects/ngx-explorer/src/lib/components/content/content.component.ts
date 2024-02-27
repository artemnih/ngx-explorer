import { AsyncPipe, NgComponentOutlet } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { IconsComponent } from '../icons/icons.component';
import { ListComponent } from '../list/list.component';
import { MenuBarComponent } from '../menu-bar/menu-bar.component';
import { SecondMenuBarComponent } from '../second-menu-bar/second-menu-bar.component';
import { TreeComponent } from '../tree/tree.component';
import { map, BehaviorSubject } from 'rxjs';
import { CURRENT_VIEW, VIEWS } from '../../shared/providers';
import { View } from '../../shared/types';

@Component({
    selector: 'nxe-content',
    standalone: true,
    imports: [AsyncPipe, MenuBarComponent, TreeComponent, SecondMenuBarComponent, IconsComponent, ListComponent, NgComponentOutlet],
    templateUrl: './content.component.html',
    styleUrl: './content.component.scss',
})
export class ContentComponent {
    public viewComponent$ = this.currentView$.pipe(map((view) => this.views.find((v) => v.name === view)!.component));

    constructor(
        @Inject(CURRENT_VIEW) private currentView$: BehaviorSubject<string>,
        @Inject(VIEWS) protected views: View[]
    ) {}
}
