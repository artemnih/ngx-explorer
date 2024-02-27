import { INode } from './types';

export class Utils {
    private static id = 0;

    static createNode(parentId = 0, isLeaf = false, data: unknown = {}) {
        const id = ++this.id;
        return {
            id,
            parentId,
            data,
            isLeaf,
            children: [],
        } as INode;
    }

    static compareObjects(a: any, b: any) {
        return JSON.stringify(a) === JSON.stringify(b);
    }
}
