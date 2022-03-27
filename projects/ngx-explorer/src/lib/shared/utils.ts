import { XNode, Dictionary } from '../common/types';

export class Utils {

    private static id = 0;

    static createNode(parentId = 0, isLeaf = false, data?: any): XNode {
        const id = ++this.id;
        return {
            id,
            parentId,
            data,
            isLeaf,
            children: []
        };
    }

    static buildBreadcrumbs(flatPointers: Dictionary<XNode>, node: XNode) {
        const pieces = [] as XNode[];
        let currentNode = node;
        while (true) {
            pieces.unshift(currentNode);
            if (currentNode.parentId) {
                currentNode = flatPointers[currentNode.parentId];
            } else {
                break;
            }
        }
        return pieces;
    }

    static compareObjects(a: any, b: any) {
        return JSON.stringify(a) === JSON.stringify(b);
    }
}
