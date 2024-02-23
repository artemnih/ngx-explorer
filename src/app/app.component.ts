import { Component } from '@angular/core';
import { ExplorerComponent } from 'ngx-explorer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [ExplorerComponent]
})
export class AppComponent {
  title = 'explorer-app';
}
