import { Injectable } from '@angular/core';

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

@Injectable({
    providedIn: 'root'
})
export class ExampleDataService {

    getNodeChildren(folder: any): any[] {
        const folderPath = folder?.path || '';
        return mock_folders.filter(f => {
            const paths = f.path.split('/');
            paths.pop();
            const filteredPath = paths.join('/');
            return filteredPath === folderPath;
        })
    }
}
