import { Component } from '@angular/core';
import { TreeComponent } from '../tree/tree.component';
import { ContentComponent } from '../content/content.component';

@Component({
    selector: 'nxe-explorer',
    templateUrl: './explorer.component.html',
    styleUrls: ['./explorer.component.scss'],
    standalone: true,
    imports: [TreeComponent, ContentComponent],
})
export class ExplorerComponent {}
