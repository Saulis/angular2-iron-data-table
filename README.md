## Setting up `<iron-data-table>` with `ng cli`
#### Setup new project
- `ng new my-dream-app`
- `cd my-dream-app`

#### Install and Configure directives
- `npm install angular2-iron-data-table --save`

`angular-cli-build.json`:
- Add `'@vaadin/angular2-polymer/**/*.js'` and `'angular2-iron-data-table/index.js'` to `vendorNpmFiles`

`src/system-config.ts`:
- Add `@vaadin/angular2-polymer` and `angular2-iron-data-table` to `barrels`
- Add `'@vaadin': 'vendor/@vaadin'` and `'angular2-iron-data-table': 'vendor/angular2-iron-data-table'` to `map`

#### Install and Configure `<iron-data-table>`
- `cd public`
- `bower install iron-data-table`

`index.html`:
- Add `<script src="bower_components/webcomponentsjs/webcomponents-lite.js"></script>`
- Add `<link rel="import" href="bower_components/iron-data-table/iron-data-table.html">`
- Add `<link rel="import" href="bower_components/iron-data-table/default-styles.html">` (optional)

`src/app/my-dream-app.component.ts`
- Add `import { PolymerElement } from '@vaadin/angular2-polymer';`
- Add `import { RowTemplate, HeaderTemplate, DetailsTemplate} from 'angular2-iron-data-table';`
- Add `items = [{value: 'foo'}, {value: 'bar'}];` into constructor

`src/app/my-dream-app.component.html`
- Add ```html
<iron-data-table [items]="items">
  <data-table-column name="Column Name">
    <div *headerTemplate="let column=column">Column name is: {{column.name}}</div>
    <div *rowTemplate="let item=item">{{item.value}}</div>
  </data-table-column>
</iron-data-table>
```
