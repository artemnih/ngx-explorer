import { Component, ViewEncapsulation } from '@angular/core';
import { ExplorerService } from '../../services/explorer.service';
import { HelperService } from '../../services/helper.service';
import { BaseView } from '../base-view/base-view.directive';

@Component({
  selector: 'nxe-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ListComponent extends BaseView {

  public readonly icons = {
    node: 'fa fa-folder-o',
    leaf: 'fa fa-file-o',
  };

  constructor(explorerService: ExplorerService, helperService: HelperService) {
    super(explorerService, helperService);
  }

}
