import { InjectionToken } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AvialableView } from '../common/types';

export const CURRENT_VIEW = new InjectionToken<BehaviorSubject<AvialableView>>('CURRENT_VIEW', {
    providedIn: 'root',
    factory: () => new BehaviorSubject(AvialableView.Icon),
});
