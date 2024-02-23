import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { CONFIG, DataService, NgeExplorerConfig } from 'ngx-explorer';
import { ExampleDataService } from './app/data.service';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: DataService, useClass: ExampleDataService },
    {
      provide: CONFIG, useValue: {
        homeNodeName: 'Home',
        autoRefresh: false,
        autoRefreshInterval: 10000
      } as NgeExplorerConfig
    },
     // { provide: NxeExplorerHelpers, useClass: LittleHelpers }
  ]
});