import { Component } from '@angular/core';
import { ContentComponent, ExplorerComponent, TreeComponent } from 'ngx-explorer';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [ExplorerComponent, ContentComponent, TreeComponent],
})
export class AppComponent {
    title = 'explorer-app';
}
