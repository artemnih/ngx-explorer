import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FILTER_STRING } from '../../shared/providers';
import { ExplorerService } from '../../services/explorer.service';
import { HelperService } from '../../services/helper.service';
import { BaseView } from '../base-view/base-view.directive';
import { DragDropDirective } from '../../directives/drag-drop.directive';
import { NgClass } from '@angular/common';

@Component({
  selector: 'nxe-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [DragDropDirective, NgClass]
})
export class ListComponent extends BaseView {

  public readonly icons = {
    node: 'nxe-folder',
    leaf: 'nxe-doc',
  };

  constructor(explorerService: ExplorerService, helperService: HelperService, @Inject(FILTER_STRING) filter: BehaviorSubject<string>) {
    super(explorerService, helperService, filter);
  }

}
