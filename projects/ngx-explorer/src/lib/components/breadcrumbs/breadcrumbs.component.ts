import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation } from '@angular/core';
import { map } from 'rxjs';
import { INode, NgeExplorerConfig } from '../../shared/types';
import { ExplorerService } from '../../services/explorer.service';
import { CONFIG, NAME_FUNCTION } from '../../shared/providers';
import { AsyncPipe } from '@angular/common';

interface Breadcrumb {
    node: INode;
    name: string;
}

@Component({
    selector: 'nxe-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    styleUrls: ['./breadcrumbs.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [AsyncPipe],
})
export class BreadcrumbsComponent {
    public breadcrumbs$ = this.explorerService.openedDir$.pipe(
        map((n) => {
            if (!n) {
                return [];
            }
            const pieces = [] as Breadcrumb[];
            let currentNode = n;
            while (currentNode.parentId) {
                pieces.unshift({ name: this.getName(currentNode) || this.config.homeNodeName || '', node: currentNode });
                currentNode = this.explorerService.getNode(currentNode.parentId);
            }
            pieces.unshift({ name: this.getName(currentNode) || this.config.homeNodeName || '', node: currentNode });
            return pieces;
        })
    );

    constructor(
        private explorerService: ExplorerService,
        @Inject(NAME_FUNCTION) private getName: (node: INode) => string,
        @Inject(CONFIG) private config: NgeExplorerConfig
    ) {}

    public click(crumb: Breadcrumb) {
        this.explorerService.openNode(crumb.node.id);
    }
}
