import { InjectionToken } from '@angular/core';
import { NgxExplorerConfig } from '../common/types';

export const NGX_EXPLORER_CONFIG = new InjectionToken<NgxExplorerConfig>('NGX_EXPLORER_CONFIG', {
    providedIn: 'root',
    factory: () => {
        return {
        };
    },
});
