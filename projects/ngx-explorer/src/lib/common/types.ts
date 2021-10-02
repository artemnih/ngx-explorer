import { Observable } from "rxjs";

export type NodeContent = { files: any[], folders: any[] };

export interface Dictionary<T> {
    [Key: string]: T;
}

export interface NxeNode {
    id: string;
    parentId: string;
    data: any;
    isLeaf: boolean;
    children: NxeNode[];
}

export interface DataProvider {
    getNodeChildren(nodeInfo: any): Observable<NodeContent>;
}
