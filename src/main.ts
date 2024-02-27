import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { DataService, INode, NAME_FUNCTION } from 'ngx-explorer';
import { ExampleDataService } from './app/data.service';

if (environment.production) {
    enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        { provide: DataService, useClass: ExampleDataService },
        {
            provide: NAME_FUNCTION,
            useValue: (node: INode) => node.data['name'],
        },
        // {
        //   provide: CONFIG, useValue: {
        //     homeNodeName: 'Home',
        //     autoRefresh: false,
        //     autoRefreshInterval: 10000
        //   } as NgeExplorerConfig
        // },
    ],
});
