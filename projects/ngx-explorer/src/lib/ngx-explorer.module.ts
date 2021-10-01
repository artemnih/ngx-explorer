import { NgModule } from '@angular/core';
import { IconsComponent } from './components/icons/icons.component';
import { CommonModule } from '@angular/common';
import { ExplorerComponent } from './components/explorer/explorer.component';

@NgModule({
  declarations: [
    IconsComponent,
    ExplorerComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [IconsComponent, ExplorerComponent]
})
export class NgxExplorerModule { }
