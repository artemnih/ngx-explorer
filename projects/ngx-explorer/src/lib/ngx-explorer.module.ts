import { NgModule } from '@angular/core';
import { NgxExplorerComponent } from './ngx-explorer.component';
import { ExampleComponent } from './example/example.component';
import { IconsComponent } from './icons/icons.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    NgxExplorerComponent,
    ExampleComponent,
    IconsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [NgxExplorerComponent, IconsComponent]
})
export class NgxExplorerModule { }
