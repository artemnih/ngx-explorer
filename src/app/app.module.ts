import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgxExplorerModule} from 'ngx-explorer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxExplorerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


/*

NgxExplorerModule.forRoot({
  views: [ someView]
  dataParser: someDataParser
})

*/