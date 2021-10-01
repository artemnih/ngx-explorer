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

0. interface to be implemented by the service
1. build fake data
2. build fake data service
3. do dep injection forRoot
4. bring components from old repo
5. build demo




NgxExplorerModule.forRoot({
  views: [ someView]
  dataParser: someDataParser
})

*/