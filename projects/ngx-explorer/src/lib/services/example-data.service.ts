import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DataProvider, NodeContent, TNode } from '../common/types';
import { v4 as uuid } from 'uuid';

const mock_folders = [
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

const mock_files = [
    { id: 428, name: 'notes.txt', path: '' },
    { id: 4281, name: '2.txt', path: '' },
    { id: 28, name: 'Thriller', path: 'music/rock/thebeatles/thriller' },
    { id: 29, name: 'Imagine', path: 'music/rock/thebeatles/imagine' },
    { id: 210, name: 'Greatest Hits', path: 'music/rock/thebeatles/greatesthits' },
    { id: 211, name: 'Sgt. Pepper\'s Lonely Hearts Club Band', path: 'music/rock/thebeatles/sgpeppers' },
    { id: 212, name: 'Rubber Soul', path: 'music/rock/thebeatles/rubbersoul' },
    { id: 213, name: 'Revolver', path: 'music/rock/thebeatles/revolver' },
    { id: 214, name: 'Abbey Road', path: 'music/rock/thebeatles/abbeyroad' },
    { id: 219, name: 'Back in Black', path: 'music/rock/acdc/backinblack' },
    { id: 220, name: 'Highway to Hell', path: 'music/rock/acdc/highwaytohell' },
    { id: 221, name: 'TNT', path: 'music/rock/acdc/tnt' },
    { id: 222, name: 'Live at the Apollo', path: 'music/rock/acdc/apollo' },
    { id: 223, name: 'Let There Be Rock', path: 'music/rock/acdc/letbe' },
    { id: 224, name: 'Balls to the Wall', path: 'music/rock/ledzeppelin/ballstothewall' },
    { id: 225, name: 'IV', path: 'music/rock/ledzeppelin/iv' },
    { id: 226, name: 'Presence', path: 'music/rock/ledzeppelin/presence' },
    { id: 227, name: 'The Song Remains the Same', path: 'music/rock/ledzeppelin/songremains' },
    { id: 228, name: 'The Rover', path: 'music/rock/ledzeppelin/rover' },
]

@Injectable({
    providedIn: 'root'
})
export class ExampleDataService implements DataProvider {

    createNode(node: TNode, data: TNode): Observable<TNode> {
        const path = (node?.path? node.path + '/' : '') + data.replace(/[\W_]+/g, " ");
        const newFolder = { path, id: uuid(), name: data };
        mock_folders.push(newFolder);
        return of(newFolder);
    }

    getNodeChildren(node: TNode): Observable<NodeContent> {
        const folderPath = node?.path || '';

        const nodes = mock_folders.filter(f => {
            const paths = f.path.split('/');
            paths.pop();
            const filteredPath = paths.join('/');
            return filteredPath === folderPath;
        });

        const leafs = mock_files.filter(f => {
            const paths = f.path.split('/');
            paths.pop();
            const filteredPath = paths.join('/');
            return filteredPath === folderPath;
        });

        return of({ leafs, nodes });
    }
}
