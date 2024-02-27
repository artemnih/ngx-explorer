import { Component, ViewEncapsulation } from '@angular/core';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { FilterComponent } from '../filter/filter.component';

@Component({
    selector: 'nxe-second-menu-bar',
    templateUrl: './second-menu-bar.component.html',
    styleUrls: ['./second-menu-bar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [BreadcrumbsComponent, FilterComponent],
})
export class SecondMenuBarComponent {}
