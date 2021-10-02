import { NgModule } from '@angular/core';
import { IconsComponent } from './components/icons/icons.component';
import { CommonModule } from '@angular/common';
import { ExplorerComponent } from './components/explorer/explorer.component';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';

@NgModule({
  declarations: [
    IconsComponent,
    ExplorerComponent,
    MenuBarComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [IconsComponent, ExplorerComponent, MenuBarComponent]
})
export class NgxExplorerModule { }
