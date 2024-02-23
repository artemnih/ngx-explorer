import { InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AvialableView, NgeExplorerConfig } from './types';

export const CURRENT_VIEW = new InjectionToken<BehaviorSubject<AvialableView>>('NXE_CURRENT_VIEW', {
    providedIn: 'root',
    factory: () => new BehaviorSubject<AvialableView>(AvialableView.Icon),
});

export const FILTER_STRING = new InjectionToken<BehaviorSubject<string>>('NXE_FILTER_STRING', {
    providedIn: 'root',
    factory: () => new BehaviorSubject(''),
});

export const CONFIG = new InjectionToken<NgeExplorerConfig>('NXE_CONFIG', {
    factory: () => ({
        homeNodeName: 'Files',
        autoRefresh: false,
        autoRefreshInterval: 10000
    }),
});