import { Observable } from "rxjs";

export type TLeaf = any;
export type TNode = any;
export type NodeContent = { leafs: TLeaf[], nodes: TNode[] };

export interface Dictionary<T> {
    [Key: string]: T;
}

export interface XNode {
    id: string;
    parentId: string;
    data: TNode | TLeaf;
    isLeaf: boolean;
    children: XNode[];
}

export interface DataProvider {
    getNodeChildren(nodeInfo: TNode): Observable<NodeContent>;
    createNode(parentData: TNode, data: TNode) : Observable<TNode>;
    renameNode(nodeInfo: TNode, newName: string): Observable<TNode>;
    renameLeaf(leafInfo: TLeaf, newName: string): Observable<TLeaf>;
    deleteNodes(nodeInfos: TNode[]): Observable<any>;
    deleteLeafs(leafInfos: TLeaf[]): Observable<any>;
}
