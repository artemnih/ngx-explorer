import { ChangeDetectionStrategy, Component, Inject, ViewEncapsulation } from '@angular/core';
import { map } from 'rxjs';
import { INode, NgeExplorerConfig } from '../../shared/types';
import { ExplorerService } from '../../services/explorer.service';
import { HelperService } from '../../services/helper.service';
import { CONFIG } from '../../shared/providers';
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
    imports:[AsyncPipe],
})
export class BreadcrumbsComponent {
    public breadcrumbs$ = this.explorerService.openedNode.pipe(map(n => {
        if (!n) {
            return [];
        }
        const pieces = [] as Breadcrumb[];
        let currentNode = n;
        while (true) {
            pieces.unshift({ name: this.helperService.getName(currentNode) || this.config.homeNodeName || '', node: currentNode });
            if (currentNode.parentId) {
                currentNode = this.explorerService.getNode(currentNode.parentId);
            } else {
                break;
            }
        }
        console.log(pieces);
        return pieces;
    }));

    constructor(private explorerService: ExplorerService, private helperService: HelperService, @Inject(CONFIG) private config: NgeExplorerConfig) {   
    }

    public click(crumb: Breadcrumb) {
        this.explorerService.openNode(crumb.node.id);
    }

}
