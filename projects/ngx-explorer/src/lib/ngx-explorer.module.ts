import { NgModule } from '@angular/core';
import { IconsComponent } from './components/icons/icons.component';
import { CommonModule } from '@angular/common';
import { ExplorerComponent } from './components/explorer/explorer.component';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { ListComponent } from './components/list/list.component';
import { SecondMenuBarComponent } from './components/second-menu-bar/second-menu-bar.component';
import { ViewSwitcherComponent } from './components/view-switcher/view-switcher.component';
import { TreeComponent } from './components/tree/tree.component';

@NgModule({
  declarations: [
    IconsComponent,
    ExplorerComponent,
    MenuBarComponent,
    BreadcrumbsComponent,
    ListComponent,
    SecondMenuBarComponent,
    ViewSwitcherComponent,
    TreeComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    IconsComponent, 
    ExplorerComponent, 
    MenuBarComponent,
    BreadcrumbsComponent,
    ListComponent,
    SecondMenuBarComponent,
    ViewSwitcherComponent,
    TreeComponent,
  ]
})
export class NgxExplorerModule { }
