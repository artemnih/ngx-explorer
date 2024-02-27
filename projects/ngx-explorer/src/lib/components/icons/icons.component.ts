import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FILTER_STRING, NAME_FUNCTION } from '../../shared/providers';
import { ExplorerService } from '../../services/explorer.service';
import { BaseView } from '../base-view/base-view.directive';
import { DragDropDirective } from '../../directives/drag-drop.directive';
import { NgClass } from '@angular/common';
import { INode } from '../../shared/types';

@Component({
    selector: 'nxe-icons',
    templateUrl: './icons.component.html',
    styleUrls: ['./icons.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [DragDropDirective, NgClass]
})
export class IconsComponent extends BaseView {

    public readonly icons = {
        node: 'nxe-folder',
        leaf: 'nxe-doc',
    };

    constructor(
        explorerService: ExplorerService,
        @Inject(FILTER_STRING) filter: BehaviorSubject<string>,
        @Inject(NAME_FUNCTION) getName: (node: INode) => string,
    ) {
        super(explorerService, getName, filter);
    }

}
