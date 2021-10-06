import { NgModule } from '@angular/core';
import { IconsComponent } from './components/icons/icons.component';
import { CommonModule } from '@angular/common';
import { ExplorerComponent } from './components/explorer/explorer.component';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { ListComponent } from './components/list/list.component';

@NgModule({
  declarations: [
    IconsComponent,
    ExplorerComponent,
    MenuBarComponent,
    BreadcrumbsComponent,
    ListComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    IconsComponent, 
    ExplorerComponent, 
    MenuBarComponent,
    BreadcrumbsComponent
  ]
})
export class NgxExplorerModule { }
