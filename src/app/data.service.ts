import { forkJoin, Observable, of, Subscriber } from 'rxjs';
import { Data, IDataService } from 'ngx-explorer';

interface MyExplorerEntity extends Data {
    id: number;
    name: string;
    path: string;
    content: string;
}

let MOCK_DIRS = [
    { id: 1, name: 'Music', path: 'music' },
    { id: 2, name: 'Movies', path: 'movies' },
    { id: 3, name: 'Books', path: 'books' },
    { id: 4, name: 'Games', path: 'games' },
    { id: 5, name: 'Rock', path: 'music/rock' },
    { id: 6, name: 'Jazz', path: 'music/jazz' },
    { id: 11, name: 'Very Long Name to display overflow', path: 'long' },

    { id: 7, name: 'Classical', path: 'music/classical' },
    { id: 15, name: 'Aerosmith', path: 'music/rock/aerosmith' },
    { id: 16, name: 'AC/DC', path: 'music/rock/acdc' },
    { id: 17, name: 'Led Zeppelin', path: 'music/rock/ledzeppelin' },
    { id: 18, name: 'The Beatles', path: 'music/rock/thebeatles' },
] as MyExplorerEntity[];

let MOCK_FILES = [
    { id: 1312, name: 'notes.txt', path: '', content: 'hi, this is an example' },
    { id: 1212, name: '2.txt', path: '', content: 'hi, this is an example' },
    { id: 28, name: 'Thriller.txt', path: 'music/rock/thebeatles/thriller', content: 'hi, this is an example' },
    { id: 29, name: 'Back in the U.S.S.R.txt', path: 'music/rock/thebeatles', content: 'hi, this is an example' },
    { id: 30, name: 'All You Need Is Love.txt', path: 'music/rock/thebeatles', content: 'hi, this is an example' },
    { id: 31, name: 'Hey Jude.txt', path: 'music/rock/ledzeppelin/heyjude', content: 'hi, this is an example' },
    { id: 32, name: 'Rock And Roll All Nite.txt', path: 'music/rock/ledzeppelin/rockandrollallnight', content: 'hi, this is an example' },
] as MyExplorerEntity[];

export class ExampleDataService implements IDataService<MyExplorerEntity> {
    private id = 0;
    private folderId = 1000;

    constructor() {
        for (let i = 0; i < 140; i++) {
            const name = 'Folder ' + i;
            this.createDir({ id: 0, name: '', path: '', content: '' }, name).subscribe();
        }

        const dt = new DataTransfer();
        for (let i = 0; i < 200; i++) {
            const name = 'File ' + i + '.txt';
            const file = new File([''], name);
            dt.items.add(file);
        }
        this.uploadFiles({ id: 3, name: 'Books', path: 'books', content: '' }, dt.files).subscribe();
    }

    downloadFile(data: MyExplorerEntity): Observable<any> {
        const file = MOCK_FILES.find((f) => f.id === data.id);

        const myblob = new Blob([file!.content], {
            type: 'text/plain',
        });
        const objectUrl = window.URL.createObjectURL(myblob);
        const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;

        a.href = objectUrl;
        a.download = file!.name;
        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        URL.revokeObjectURL(objectUrl);
        return of(null);
    }

    uploadFiles(parent: MyExplorerEntity, files: FileList): Observable<any> {
        const results = [];

        for (let i = 0; i < files.length; i++) {
            const file = files.item(i)!;
            const obs = new Observable((observer: Subscriber<any>): void => {
                const reader = new FileReader();

                const id = ++this.id;

                reader.onload = () => {
                    const nodePath = parent ? MOCK_DIRS.find((f) => f.id === parent.id)!.path : '';
                    const newFile = { id, name: file.name, path: nodePath + '/' + file.name, content: reader.result as string };
                    MOCK_FILES.push(newFile);
                    observer.next(reader.result);
                    observer.complete();
                };
                reader.readAsText(file);
            });
            results.push(obs);
        }

        return forkJoin(results);
    }

    deleteDirs(datas: MyExplorerEntity[]): Observable<any> {
        const results = datas.map((data) => {
            const path = data.path + '/';
            MOCK_FILES = MOCK_FILES.filter((f) => !f.path.startsWith(path));
            MOCK_DIRS = MOCK_DIRS.filter((f) => !f.path.startsWith(path));
            MOCK_DIRS = MOCK_DIRS.filter((f) => f.id !== data.id);
            return of({});
        });
        return forkJoin(results);
    }

    deleteFiles(nodes: MyExplorerEntity[]): Observable<any> {
        const results = nodes.map((node) => {
            const leaf = MOCK_FILES.find((f) => f.id === node.id)!;
            const index = MOCK_FILES.indexOf(leaf);
            MOCK_FILES.splice(index, 1);
            return of({});
        });
        return forkJoin(results);
    }

    createDir(parent: MyExplorerEntity, name: string): Observable<any> {
        const path = (parent.path ? parent.path + '/' : '') + name.replace(/[\W_]+/g, ' ');
        const id = ++this.folderId;
        const newFolder = { path, id, name, content: '' };
        MOCK_DIRS.push(newFolder);
        return of(newFolder);
    }

    getContent(data: MyExplorerEntity) {
        const folderPath = data.path || '';

        const dirs = MOCK_DIRS.filter((f) => {
            const paths = f.path.split('/');
            paths.pop();
            const filteredPath = paths.join('/');
            return filteredPath === folderPath;
        });

        const files = MOCK_FILES.filter((f) => {
            const paths = f.path.split('/');
            paths.pop();
            const filteredPath = paths.join('/');
            return filteredPath === folderPath;
        });

        return of({ files, dirs });
    }

    renameDir(data: MyExplorerEntity, newName: string) {
        const node = MOCK_DIRS.find((f) => f.id === data.id)!;
        node.name = newName;
        return of(node);
    }

    renameFile(data: MyExplorerEntity, newName: string) {
        const leaf = MOCK_FILES.find((f) => f.id === data.id)!;
        leaf.name = newName;
        return of(leaf);
    }
}
