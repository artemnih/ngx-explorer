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
        this.sub.add(this.explorerService.breadcrumbs.subscribe(n => this.buildBreadcrumbs(n)));
    }

    private buildBreadcrumbs(nodes: XNode[]) {
        this.breadcrumbs = nodes.map(n => ({ name: this.helperService.getName(n.data) || 'HOME', node: n }));
    }

    public click(crumb: Breadcrumb) {
        this.explorerService.openNode(crumb.node.id);
    }

}
