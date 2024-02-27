import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { NAME_FUNCTION } from '../../shared/providers';
import { ExplorerService } from '../../services/explorer.service';
import { BaseView } from '../base-view/base-view.directive';
import { DragDropDirective } from '../../directives/drag-drop.directive';
import { NgClass } from '@angular/common';
import { INode } from '../../shared/types';

@Component({
    selector: 'nxe-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [DragDropDirective, NgClass],
})
export class ListComponent extends BaseView {
    public readonly icons = {
        node: 'nxe-folder',
        leaf: 'nxe-doc',
    };

    constructor(explorerService: ExplorerService, @Inject(NAME_FUNCTION) getName: (node: INode) => string) {
        super(explorerService, getName);
    }
}
