import { Injectable } from '@angular/core';
import { IDataService, Data } from '../shared/types';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export abstract class DataService implements IDataService<Data> {
    abstract getContent(data: Data): Observable<{files: Data[]; dirs: Data[]}>;
    abstract createDir(data: Data, name: string): Observable<Data>;
    abstract renameDir(data: Data, newName: string): Observable<Data>;
    abstract renameFile(data: Data, newName: string): Observable<Data>;
    abstract deleteDirs(data: Data[]): Observable<Data>;
    abstract deleteFiles(data: Data[]): Observable<Data>;
    abstract uploadFiles(data: Data, files: FileList): Observable<Data>;
    abstract downloadFile(data: Data): Observable<Data>;
}
