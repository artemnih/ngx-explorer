import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgxExplorerModule, DataService } from 'ngx-explorer';
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
    // { provide: NGX_EXPLORER_CONFIG, useValue: { test: 123 } }
    // { provide: NxeExplorerHelpers, useClass: LittleHelpers }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
