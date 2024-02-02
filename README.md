
# ng-dropfile

An easy-to-use and customizable Angular component for handling file uploads with advanced features such as image preview, file deletion, and multiple event triggers. Empower your applications with seamless file management using the Angular Dropify component.



## Installation

Install __ng-dropfile__ package with npm

```bash
  npm install ng-dropfile
```
    
## Setup
Import the __ngDropfileModule__ in your application.

```typescript
import { CommonModule } from '@angular/common';
import { NgDropfileModule } from 'ng-dropfile';

@NgModule({
  imports: [
    CommonModule,
    NgDropfileModule,
  ],
  bootstrap: [...],
  declarations: [...],
})
class MainModule {}

```

## Usage/Examples



Create the directive where you need it:
```html
<ng-dropfile></ng-dropfile>
```

You can customize your _dropfile_ properties directly. In this example, we change the default _maxFileSize_ from 1MB to 5MB.
```html
<ng-dropfile [maxFileSize]="5"></ng-dropfile>
```

This is how you can change the default messages for the component:
```html
<ng-dropfile [messages]="{ description:'Drag and Drop your files'}"></ng-dropfile>
```
You also can capture the emmited events:
```html
<ng-dropfile (onClear)="myFunction($event)"></ng-dropfile>
```

## Options
Individual customizable options.

| Option          | Description                                       | Type                  | Default Value         |
| ------------------ | ------------------------------------------------- | --------------------- | --------------------- |
| `defaultFile`      | Default file name.                                | `string`              | `''`                    |
| `maxFileSize`      | Maximum file size in megabytes.                   | `number`              | `0.6`                   |
| `minWidth`         | Minimum allowed width for images.                 | `number`              | `0`                     |
| `maxWidth`         | Maximum allowed width for images.                 | `number`              | `0`                     |
| `minHeight`        | Minimum allowed height for images.                | `number`              | `0`                     |
| `maxHeight`        | Maximum allowed height for images.                | `number`              | `0`                     |
| `multiple`         | Allow multiple file selection.                   | `boolean`             | `true`                |
| `showRemove`       | Show or hide the option to remove files.          | `boolean`             | `true`                |
| `showLoader`       | Show or hide the loading indicator.              | `boolean`             | `true`                |
| `showErrors`       | Show or hide error messages.                      | `boolean`             | `true`                |
| `showFileList`     | Show or hide the list of selected files.          | `boolean`             | `true`                |
| `formatsAccepted`  | Accepted file formats.                            | `string[]`            | `['png', 'jpg', 'jpeg', 'gif', 'pdf']` |
| `messages`         | Custom messages for the user interface.           | `{ description: string, formats: string, replace: string }` | `{ description: 'Choose a file or drag and drop it here', formats: '', replace: 'Click to replace' }` |
| `errors`           | Possible error messages.                          | `{ default: string, filesize: string, formats: string }` | `{ default: 'Ooops; something wrong happened.', filesize: 'Some files are too big.', formats: 'Some files don't match the valid formats.' }` |

## Events
Callable

| Event            | Description                                        | Event Type                        |
|-------------------|----------------------------------------------------|-----------------------------------|
| `onDelete`          | Triggered when a file is deleted or removed.       | `EventEmitter<File>` |
| `onSelect`   | Triggered when one or more files are selected.     | `EventEmitter<File[] \| FileList>`  |
| `onError`           | Triggered when an error occurs.                    | `EventEmitter<string>`            |
| `onClear`           | Triggered when the component is reset or cleared.  | `EventEmitter<void>`              |


## License

[MIT](https://choosealicense.com/licenses/mit/)


## Authors

- [@developcastle](https://github.com/developcastle)

