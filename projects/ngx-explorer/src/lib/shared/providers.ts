import { InjectionToken, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AvialableView, NgeExplorerConfig } from './types';

export const CONFIG = new InjectionToken<NgeExplorerConfig>('NXE_CONFIG', {
    factory: () => ({
        homeNodeName: 'Files',
        autoRefresh: false,
        autoRefreshInterval: 10000,
        defaultView: AvialableView.Icon,
    }),
});

export const CURRENT_VIEW = new InjectionToken<BehaviorSubject<AvialableView>>('NXE_CURRENT_VIEW', {
    providedIn: 'root',
    factory: () => { 
        const config = inject(CONFIG);
        const defaultView = config.defaultView || AvialableView.List;
        return new BehaviorSubject<AvialableView>(defaultView) 
    }
});


export const FILTER_STRING = new InjectionToken<BehaviorSubject<string>>('NXE_FILTER_STRING', {
    providedIn: 'root',
    factory: () => new BehaviorSubject(''),
});
