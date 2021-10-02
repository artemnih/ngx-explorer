import { Observable } from "rxjs";

export type TLeaf = any;
export type TNode = any;
export type NodeContent = { leafs: TLeaf[], nodes: TNode[] };

export interface Dictionary<T> {
    [Key: string]: T;
}

export interface NxeNode {
    id: string;
    parentId: string;
    data: TNode | TLeaf;
    isLeaf: boolean;
    children: NxeNode[];
}

export interface DataProvider {
    getNodeChildren(nodeInfo: TNode): Observable<NodeContent>;
    createNode(parentData: TNode, data: TNode) : Observable<TNode>;
}
