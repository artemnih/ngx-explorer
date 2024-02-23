# ngx-explorer
Lightweight and easy-to-use Angular File Explorer module.
This is a front-end implementation only. There are no services at this point.

[DEMO](https://artemnih.github.io/ngx-explorer/)

## How to use
- Install package 
```bash
npm i ngx-explorer
```
- Implement `IDataService` provider interface which contains API for fetching data from the server.
```Typescript
import { IDataService } from 'ngx-explorer';

export class MyDataService implements IDataService<MyNodeType> {
    ... 
}
```
And provide the implementation:
```
 { provide: DataService, useClass: ExampleDataService },
```

### Standalone usage:

```Typescript
import { ExplorerComponent } from 'ngx-explorer';

@Component({
  selector: 'my-component',
  templateUrl: './my.component.html',
  styleUrls: ['./my.component.scss'],
  standalone: true,
  imports: [ExplorerComponent],

  //  if you want to provide inside the component instead of main.ts or mnodule
  //   providers: [
  //     { provide: DataService, useClass: MyDataService }
  //   ]
})
export class MyComponent {
```
You may also provide `DataService` in `main.ts` instead.

### Non-Standalone usage:
```Typescript
import { NgxExplorer, DataService } from 'ngx-explorer';

@NgModule({
    imports: [
        ...
        NgxExplorerModule
    ],
    providers: [
        { provide: DataService, useClass: MyDataService }
    ]
})
export class AppModule { }
```

### Template and styles
- Add tag to the template:
```html
<h1>My Component</h1>
<div>
    <nxe-explorer></nxe-explorer>
</div>
```
- Add css import `styles.scss`:
```scss
@import '~ngx-explorer/src/assets/icons/css/nxe.css';
```


![explorer](docs/ss.png)