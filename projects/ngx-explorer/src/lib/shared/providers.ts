import { InjectionToken, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { INode, NgeExplorerConfig, View } from './types';
import { IconsComponent, ListComponent } from '../../public-api';

export const VIEWS = new InjectionToken<View[]>('NXE_VIEWS', {
    providedIn: 'root',
    factory: () => [
        {
            name: 'Icons',
            icon: 'nxe-th-large',
            component: IconsComponent,
        },
        {
            name: 'List',
            icon: 'nxe-menu',
            component: ListComponent,
        },
    ],
});

export const CONFIG = new InjectionToken<NgeExplorerConfig>('NXE_CONFIG', {
    providedIn: 'root',
    factory: () => {
        const views = inject(VIEWS);
        const defaultView = views[0].name;
        return {
            homeNodeName: 'Files',
            autoRefresh: false,
            autoRefreshInterval: 10000,
            defaultView: defaultView,
        };
    },
});

export const CURRENT_VIEW = new InjectionToken<BehaviorSubject<string>>('NXE_CURRENT_VIEW', {
    providedIn: 'root',
    factory: () => {
        const config = inject(CONFIG);
        const views = inject(VIEWS);
        const defaultView = config.defaultView || views[0].name;
        return new BehaviorSubject<string>(defaultView);
    },
});

export const FILTER_STRING = new InjectionToken<BehaviorSubject<string>>('NXE_FILTER_STRING', {
    providedIn: 'root',
    factory: () => new BehaviorSubject(''),
});

export const NAME_FUNCTION = new InjectionToken<(node: INode) => string>('NXE_NAME_FUNCTION', {
    providedIn: 'root',
    factory: () => (node: INode) => node.data as unknown as string,
});
