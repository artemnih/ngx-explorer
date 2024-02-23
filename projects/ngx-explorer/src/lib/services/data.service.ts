import { Injectable } from '@angular/core';
import { IDataService, NodeContent } from '../shared/types';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export abstract class DataService<T> implements IDataService<any> {
    abstract getNodeChildren<T>(node: T): Observable<NodeContent<T>>;
    abstract createNode(parentNode: any, name: any): Observable<T>;
    abstract renameNode(node: any, newName: string): Observable<T>;
    abstract renameLeaf(node: any, newName: string): Observable<T>;
    abstract deleteNodes(nodes: any[]): Observable<T>;
    abstract deleteLeafs(nodes: any[]): Observable<T>;
    abstract uploadFiles(node: any, files: FileList): Observable<T>;
    abstract download(node: any): Observable<T>;
    // TODO multple download. should be configurable in settings
    // move(from to) // TODO: on/off in settings
    // copyPaste(from to) // TODO: on/off in settings
    // cutPaste(from to) // TODO: on/off in settings
}
