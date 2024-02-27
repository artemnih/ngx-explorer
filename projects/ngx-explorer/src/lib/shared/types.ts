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
    /**
     *  Get content of the given directory
     */
    getContent(target: T): Observable<{ files: T[]; dirs: T[] }>;

    /**
     * Create a new directory
     */
    createDir(parent: T, name: string): Observable<T>;

    /**
     * Rename the given directory
     */
    rename(target: T, newName: string): Observable<T>;

    /**
     * Delete the given directory
     */
    delete(target: T[]): Observable<T>;

    /**
     * Upload files to the given directory
     */
    uploadFiles(parent: T, files: FileList): Observable<T>;

    /**
     * Download the given file
     */
    downloadFile(target: T): Observable<T>;
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
