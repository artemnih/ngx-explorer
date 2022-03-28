import { Observable } from 'rxjs';

export type NodeContent<T> = { leafs: T[], nodes: T[] };

export interface Dictionary<T> {
    [Key: string]: T;
}

export interface INode {
    id: number;
    parentId: number;
    data: any;
    isLeaf: boolean;
    children: INode[];
}

export interface IDataService<T> {
    getNodeChildren(node: T): Observable<NodeContent<T>>;
    createNode(parentNode: T, name: string): Observable<any>;
    renameNode(node: T, newName: string): Observable<any>;
    renameLeaf(node: T, newName: string): Observable<any>;
    deleteNodes(nodes: T[]): Observable<any>;
    deleteLeafs(nodes: T[]): Observable<any>;
    uploadFiles(node: T, files: File[]): Observable<any>;
    download(node: T): Observable<any>;
}

export interface IHelperService {
    getName<T>(data: T): string;
}

export enum AvialableView { // TODO: temp. Allow injection
    List = 'List',
    Icon = 'Icon',
}
