import { Injectable } from '@angular/core';
import { IHelperService, INode} from '../shared/types';

@Injectable({
    providedIn: 'root'
})
export class HelperService implements IHelperService {

    /**
     * Get node name from node data. By default it returns the data itself. 
     * User can override this method to return a different value if for example the data is an object.
     */
    getName(node: INode): string {
        return node.data?.name as string || '';
    }
}
