import { XNode, Dictionary } from "../common/types";
import { v4 as uuid } from 'uuid';

export class Utils {
    static getHashMap(node: XNode, hashMap: Dictionary<XNode> = {}) {
        hashMap[node.id] = node;
        const nodes = node.children;
        for (const node of nodes) {
            hashMap[node.id] = node;
            if (node.children && node.children.length) {
                this.getHashMap(node, hashMap);
            }
        }
        return hashMap;
    }

    static createNode(parentId = '', isLeaf = false, data?: any) {
        return {
            id: uuid(),
            parentId: parentId,
            data: data,
            isLeaf: isLeaf,
            children: []
        }
    }
}