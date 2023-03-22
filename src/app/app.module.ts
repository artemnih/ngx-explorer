import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgxExplorerModule, DataService, NgeExplorerConfig, ConfigProvider } from 'ngx-explorer';
import { ExampleDataService } from './data.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    NgxExplorerModule
  ],
  providers: [
    { provide: DataService, useClass: ExampleDataService },
    {
      provide: ConfigProvider, useValue: new ConfigProvider({
        homeNodeName: 'Home',
        autoRefresh: false,
        autoRefreshInterval: 10000
      } as NgeExplorerConfig)
    }
    // { provide: NxeExplorerHelpers, useClass: LittleHelpers }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
