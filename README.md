
# ng-dropfile

An easy-to-use and customizable Angular component for handling file uploads with advanced features such as image preview, file deletion, and multiple event triggers. Empower your applications with seamless file management using the Angular Dropify component.


## Installation

Install __ng-dropfile__ package with npm

```bash
  npm install ng-dropfile
```
    


## Usage/Examples

Import the __ngDropfileModule__ in your application.

```javascript
import { NgDropfileModule } from 'ng-dropfile';

imports: [
    NgDropfileModule,
    ...

```

Create the directive where you need it:
```html
<ng-dropfile></ng-dropfile>
```

You can customize your _dropfile_ properties directly.
```html
<ng-dropfile [message]="'Drag and Drop your files'"></ng-dropfile>
```
## Documentation
Editable properties of the component.

| Property          | Description                                       | Type                  | Default Value         |
| ------------------ | ------------------------------------------------- | --------------------- | --------------------- |
| `defaultFile`      | Default file name.                                | `string`              | ''                    |
| `maxFileSize`      | Maximum file size in megabytes.                   | `number`              | 0.6                   |
| `minWidth`         | Minimum allowed width for images.                 | `number`              | 0                     |
| `maxWidth`         | Maximum allowed width for images.                 | `number`              | 0                     |
| `minHeight`        | Minimum allowed height for images.                | `number`              | 0                     |
| `maxHeight`        | Maximum allowed height for images.                | `number`              | 0                     |
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
| __onDelete__          | Triggered when a file is deleted or removed.       | `EventEmitter<File>` or `EventEmitter<string>` |
| __onSelect__   | Triggered when one or more files are selected.     | `EventEmitter<File[]>` or `EventEmitter<string[]>` |
| __onError__           | Triggered when an error occurs.                    | `EventEmitter<string>`            |
| __onClear__           | Triggered when the component is reset or cleared.  | `EventEmitter<void>`              |


## License

[MIT](https://choosealicense.com/licenses/mit/)


## Authors

- [@octokatherine](https://www.github.com/octokatherine)

