import { Type } from '@angular/core';
import { Observable } from 'rxjs';

export interface Data {
    [key: string]: any;
}

export interface INode {
    id: number;
    parentId: number;
    data: Data;
    isLeaf: boolean;
    children: INode[];
}

export interface Dictionary<T> {
    [Key: string]: T;
}

export interface IDataService<T extends Data> {
    getContent(data: T): Observable<{ files: T[]; dirs: T[] }>;
    createDir(parentData: T, name: string): Observable<T>;
    renameDir(data: T, newName: string): Observable<T>;
    renameFile(data: T, newName: string): Observable<T>;
    deleteDirs(datas: T[]): Observable<T>;
    deleteFiles(datas: T[]): Observable<T>;
    uploadFiles(parentData: T, files: FileList): Observable<T>;
    downloadFile(data: T): Observable<T>;
    // TODO multple download. should be configurable in settings
    // move(from to) // TODO: on/off in settings
    // copyPaste(from to) // TODO: on/off in settings
    // cutPaste(from to) // TODO: on/off in settings
}

export interface View {
    name: string;
    icon: string;
    component: Type<any>;
}

export interface NgeExplorerConfig {
    homeNodeName: string;
    autoRefresh: boolean;
    autoRefreshInterval: number;
    defaultView: string;
}
