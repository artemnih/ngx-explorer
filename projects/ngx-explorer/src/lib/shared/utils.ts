import { Dictionary } from "../interfaces/dictionary.interface";
import { NxeNode } from "../interfaces/nxe-node.interface";

export class Utils {
    static getHashMap(node: NxeNode, hashMap: Dictionary<NxeNode> = {}) {
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

    static createNode(parentId: string, id: string | number, data?: any) {
        return {
            id: parentId + '-' + id,
            parentId: parentId,
            data: data,
            children: []
        }
    }
}