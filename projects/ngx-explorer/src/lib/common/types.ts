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
    getNodeChildren(node: TNode): Observable<NodeContent>;
    createNode(parentNode: TNode, node: TNode) : Observable<TNode>;
    renameNode(node: TNode, newName: string): Observable<TNode>;
    renameLeaf(node: TNode, newName: string): Observable<TNode>;
    deleteNodes(nodes: TNode[]): Observable<any>;
    deleteLeafs(nodes: TNode[]): Observable<any>;
    uploadFiles(node: TNode, files: File[]): Observable<TNode>;
    download(node: TNode): Observable<any>;
}
