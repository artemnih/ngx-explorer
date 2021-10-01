import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class NgxExplorerService {
    public nodes = new BehaviorSubject(['a', 'b', 'c']);
    public selectedNodes = new BehaviorSubject([]);

    constructor() { 
        // setTimeout(() => {
        //     this.selectedNodes.next(['a', 'b']);
        // }, 1000);
    }

    public selectNodes(nodes: any[]) {
        console.log('selectNodes', nodes);
        this.selectedNodes.next(nodes);
    }

    public openNode(node: any) {
        console.log('openNode', node);
    }

}
