import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgxExplorerModule, DataProvider } from 'ngx-explorer';
import { DataService } from './data.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    NgxExplorerModule
  ],
  providers: [
    { provide: DataProvider, useClass: DataService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
