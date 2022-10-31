import { Injectable } from '@angular/core';
import { IHelperService } from '../shared/types';

@Injectable({
    providedIn: 'root'
})
export class HelperService implements IHelperService {

    getName(data: any): string {
        return data?.name;
    }
}
