### Custom views

-   Views are provided via `VIEWS` injection token. It is an array of `View` objects.

```Typescript
import { VIEWS, VIEW } from 'ngx-explorer';

// define your views
export const MyViews = [
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
] as View[];

// and provide them
providers: [
    { provide: VIEWS, useValue: MyViews }
]
```
