import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { XNode } from '../../common/types';
import { ExplorerService } from '../../services/explorer.service';
import { HelperService } from '../../services/helper.service';

interface Breadcrumb {
    node: XNode;
    name: string;
}

@Component({
    selector: 'nxe-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent {
    public breadcrumbs: Breadcrumb[] = [];

    private sub = new Subscription();

    constructor(private explorerService: ExplorerService, private helperService: HelperService) {
        this.sub.add(this.explorerService.openedNode.subscribe(n => this.buildBreadcrumbs(n)));
    }

    private buildBreadcrumbs(node: XNode) {

        // TODO: build breadcrumbs in service and emit to component
        const pieces = [];

        let currentNode = node;
        while (true) {
            const crumb = { name: this.helperService.getName(currentNode.data) || 'HOME', node: currentNode };
            pieces.unshift(crumb);

            if (currentNode.parentId) {
                currentNode = this.explorerService.getNode(currentNode.parentId);
            } else {
                break;
            }
        }

        this.breadcrumbs = pieces;
    }

    public click(crumb: Breadcrumb) {
        this.explorerService.openNode(crumb.node.id);
    }

}
