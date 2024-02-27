import { Component, ViewEncapsulation } from '@angular/core';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';

@Component({
    selector: 'nxe-second-menu-bar',
    templateUrl: './second-menu-bar.component.html',
    styleUrls: ['./second-menu-bar.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [BreadcrumbsComponent],
})
export class SecondMenuBarComponent {}
