import { Injectable } from "@angular/core";
import { IHelperService } from "../common/types";

@Injectable({
    providedIn: 'root'
})
export class HelperService implements IHelperService {

    getName(data: any) {
        return data?.name;
    }
}