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
    { provide: DataService, useClass: ExampleDataService }
    // { provide: NxeExplorerConfig, useValue: { example: true } }
    // { provide: NxeExplorerHelpers, useClass: LittleHelpers }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
