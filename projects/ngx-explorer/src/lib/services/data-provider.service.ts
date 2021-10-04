import { Injectable } from "@angular/core";
import { NxeDataProvider } from "ngx-explorer";

@Injectable({
    providedIn: 'root'
})
export abstract class DataProvider implements NxeDataProvider {
    abstract getNodeChildren(node: any);
    abstract createNode(parentNode: any, node: any)
    abstract renameNode(node: any, newName: string)
    abstract renameLeaf(node: any, newName: string)
    abstract deleteNodes(nodes: any[])
    abstract deleteLeafs(nodes: any[])
    abstract uploadFiles(node: any, files: File[])
    abstract download(node: any)
}
