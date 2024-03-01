import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ContentComponent, ExplorerComponent, ExplorerService, TreeComponent } from 'ngx-explorer';
import { map } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [ExplorerComponent, ContentComponent, TreeComponent, AsyncPipe],
})
export class AppComponent {
    protected openedDir$ = this.ex.openedDir$.pipe(map(p => p?.data['name']));
    protected selectionLength$ = this.ex.selection$.pipe(map(s => s.length));
    protected rootLen$ = this.ex.root$.pipe(map(r => r.children.length));

    constructor(private ex: ExplorerService) {}

    title = 'explorer-app';
}
