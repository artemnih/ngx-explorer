import { forkJoin, Observable, of, Subscriber } from 'rxjs';
import { IDataService, NodeContent } from 'ngx-explorer';

let MOCK_FOLDERS = [
  { id: 1, name: 'Music', path: 'music' },
  { id: 2, name: 'Movies', path: 'movies' },
  { id: 3, name: 'Books', path: 'books' },
  { id: 4, name: 'Games', path: 'games' },
  { id: 5, name: 'Rock', path: 'music/rock' },
  { id: 6, name: 'Jazz', path: 'music/jazz' },
  { id: 7, name: 'Classical', path: 'music/classical' },
  { id: 15, name: 'Aerosmith', path: 'music/rock/aerosmith' },
  { id: 16, name: 'AC/DC', path: 'music/rock/acdc' },
  { id: 17, name: 'Led Zeppelin', path: 'music/rock/ledzeppelin' },
  { id: 18, name: 'The Beatles', path: 'music/rock/thebeatles' },
];

let MOCK_FILES = [
  { id: 428, name: 'notes.txt', path: '', content: 'hi, this is an example' },
  { id: 4281, name: '2.txt', path: '', content: 'hi, this is an example' },
  { id: 28, name: 'Thriller.txt', path: 'music/rock/thebeatles/thriller', content: 'hi, this is an example' },
  { id: 29, name: 'Back in the U.S.S.R.txt', path: 'music/rock/thebeatles', content: 'hi, this is an example' },
  { id: 30, name: 'All You Need Is Love.txt', path: 'music/rock/thebeatles', content: 'hi, this is an example' },
  { id: 31, name: 'Hey Jude.txt', path: 'music/rock/ledzeppelin/heyjude', content: 'hi, this is an example' },
  { id: 32, name: 'Rock And Roll All Nite.txt', path: 'music/rock/ledzeppelin/rockandrollallnight', content: 'hi, this is an example' },
];

interface ExampleNode {
  name: string;
  path: string;
  content?: string;
  id: number | string;
}

export class ExampleDataService implements IDataService<ExampleNode> {
  private id = 0;
  private folderId = 20;

  download(node: ExampleNode): Observable<any> {
    const file = MOCK_FILES.find(f => f.id === node.id);

    const myblob = new Blob([file.content], {
      type: 'text/plain'
    });
    const objectUrl = window.URL.createObjectURL(myblob);
    const a: HTMLAnchorElement = document.createElement('a') as HTMLAnchorElement;

    a.href = objectUrl;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(objectUrl);
    return of(null);
  }

  uploadFiles(node: ExampleNode, files: FileList): Observable<any> {
    const results = [];

    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      const obs = new Observable((observer: Subscriber<any>): void => {
        const reader = new FileReader();

        const id = ++this.id;

        reader.onload = () => {
          const nodePath = node ? MOCK_FOLDERS.find(f => f.id === node.id).path : '';
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

  deleteNodes(nodes: ExampleNode[]): Observable<any> {
    const results = nodes.map(node => {
      const path = node.path + '/';
      MOCK_FILES = MOCK_FILES.filter(f => !f.path.startsWith(path));
      MOCK_FOLDERS = MOCK_FOLDERS.filter(f => !f.path.startsWith(path));
      MOCK_FOLDERS = MOCK_FOLDERS.filter(f => f.id !== node.id);
      return of({});
    });
    return forkJoin(results);
  }

  deleteLeafs(nodes: ExampleNode[]): Observable<any> {
    const results = nodes.map(node => {
      const leaf = MOCK_FILES.find(f => f.id === node.id);
      const index = MOCK_FILES.indexOf(leaf);
      MOCK_FILES.splice(index, 1);
      return of({});
    });
    return forkJoin(results);
  }

  createNode(node: ExampleNode, name: string): Observable<any> {
    const path = (node?.path ? node.path + '/' : '') + name.replace(/[\W_]+/g, ' ');
    const id = ++this.folderId;
    const newFolder = { path, id, name };
    MOCK_FOLDERS.push(newFolder);
    return of(newFolder);
  }

  getNodeChildren(node: ExampleNode): Observable<NodeContent<ExampleNode>> {
    const folderPath = node?.path || '';

    const nodes = MOCK_FOLDERS.filter(f => {
      const paths = f.path.split('/');
      paths.pop();
      const filteredPath = paths.join('/');
      return filteredPath === folderPath;
    });

    const leafs = MOCK_FILES.filter(f => {
      const paths = f.path.split('/');
      paths.pop();
      const filteredPath = paths.join('/');
      return filteredPath === folderPath;
    });

    return of({ leafs, nodes });
  }

  renameNode(nodeInfo: ExampleNode, newName: string): Observable<ExampleNode> {
    const node = MOCK_FOLDERS.find(f => f.id === nodeInfo.id);
    node.name = newName;
    return of(node);
  }

  renameLeaf(leafInfo: ExampleNode, newName: string): Observable<ExampleNode> {
    const leaf = MOCK_FILES.find(f => f.id === leafInfo.id);
    leaf.name = newName;
    return of(leaf);
  }
}
