# ngx-explorer
Lightweight and easy-to-use Angular File Explorer module.
This is a front-end implementation only. There are no services at this point.

[DEMO](https://artemnih.github.io/ngx-explorer/)

## How to use
- Install package
```
npm i ngx-explorer # install
npm start # run demo
```
- Implement `IDataService` provider interface
```Typescript
import { IDataService } from 'ngx-explorer';

export class MyDataService implements IDataService<MyNodeType> {
    ...
}
```
- Add `NgxExplorerModule` and data provider to `NgModule`
```Typescript
import { NgxExplorerModule, DataService } from 'ngx-explorer';

@NgModule({
    imports: [
        ...
        NgxExplorerModule
    ],
    providers: [
        { provide: DataService, useClass: MyDataService },
        {
        provide: ConfigProvider, useValue: new ConfigProvider({
            homeNodeName: 'Home',
            autoRefresh: false,
            autoRefreshInterval: 10000,
        } as NgeExplorerConfig)
    ]
})
export class AppModule { }
```
- Add `<nxe-explorer></nxe-explorer>` to the template
- Add css import `@import '~ngx-explorer/src/assets/icons/css/nxe.css'`

![explorer](docs/ss.png)
