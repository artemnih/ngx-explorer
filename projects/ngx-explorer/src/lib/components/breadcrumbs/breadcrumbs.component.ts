import { Component, Inject, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { INode, NgeExplorerConfig } from '../../shared/types';
import { ExplorerService } from '../../services/explorer.service';
import { HelperService } from '../../services/helper.service';
import { CONFIG } from '../../shared/providers';

interface Breadcrumb {
    node: INode;
    name: string;
}

@Component({
    selector: 'nxe-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    styleUrls: ['./breadcrumbs.component.scss'],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
})
export class BreadcrumbsComponent implements OnDestroy {
    public breadcrumbs: Breadcrumb[] = [];
    private sub = new Subscription();

    constructor(private explorerService: ExplorerService, private helperService: HelperService, @Inject(CONFIG )private config: NgeExplorerConfig) {
        this.sub.add(this.explorerService.breadcrumbs.subscribe(n => this.buildBreadcrumbs(n)));
    }

    private buildBreadcrumbs(nodes: INode[]) {
        this.breadcrumbs = nodes.map(n => ({ name: this.helperService.getName(n.data) || this.config.homeNodeName, node: n }));
    }

    public click(crumb: Breadcrumb) {
        this.explorerService.openNode(crumb.node.id);
    }

    public ngOnDestroy() {
        this.sub.unsubscribe();
    }

}
