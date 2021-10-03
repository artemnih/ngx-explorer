import { Observable } from "rxjs";

export type TNode = any;
export type NodeContent = { leafs: TNode[], nodes: TNode[] };

export interface Dictionary<T> {
    [Key: string]: T;
}

export interface XNode {
    id: string;
    parentId: string;
    data: TNode;
    isLeaf: boolean;
    children: XNode[];
}

export interface DataProvider {
    getNodeChildren(nodeInfo: TNode): Observable<NodeContent>;
    createNode(parentData: TNode, data: TNode) : Observable<TNode>;
    renameNode(nodeInfo: TNode, newName: string): Observable<TNode>;
    renameLeaf(leafInfo: TNode, newName: string): Observable<TNode>;
    deleteNodes(nodeInfos: TNode[]): Observable<any>;
    deleteLeafs(leafInfos: TNode[]): Observable<any>;
    uploadFiles(nodeInfo: TNode, files: File[]): Observable<TNode>;
}
