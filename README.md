
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

| Property              | Description                                     | Value Type    | Default Value     |
|-----------------------|-------------------------------------------------|---------------|-------------------|
| __defaultFile__          | Default path of the image                       | string        | ''                |
| __maxFileSize__           | Maximum file size in MB                      | number        | 1                 |
| __minWidth__              | Minimum width of the image in pixels             | number        | 0                 |
| __maxWidth__              | Maximum width of the image in pixels             | number        | 0                 |
| __minHeight__             | Minimum height of the image in pixels            | number        | 0                 |
| __maxHeight__             | Maximum height of the image in pixels            | number        | 0                 |
| __showRemove__           | Show or hide the remove button                  | boolean       | true              |
| __showLoader__            | Show or hide the loader indicator               | boolean       | true              |
| __showErrors__            | Show or hide error messages                     | boolean       | true              |
| __errorTimeout__         | Time in milliseconds to hide errors             | number        | 3000              |
| __errorsPosition__        | Position of error messages                     | string        | 'overlay'         |
| __maxFileSizePreview__   | Maximum size for preview in MB                  | string        | '5M'              |
| __formatsAccepted__        | Permitted file extensions formats. Use ['*'] to allow all format types. | string[]      | ['png', 'jpg', 'jpeg', 'gif' ,'pdf'] |         |
| __messages__             | Custom messages                                 | Object        | Refer to provided example |

## Events
Callable

| Event            | Description                                        | Event Type                        |
|-------------------|----------------------------------------------------|-----------------------------------|
| __onDelete__          | Triggered when a file is deleted or removed.       | `EventEmitter<File>` or `EventEmitter<string>` |
| __onSelectedFiles__   | Triggered when one or more files are selected.     | `EventEmitter<File[]>` or `EventEmitter<string[]>` |
| __onError__           | Triggered when an error occurs.                    | `EventEmitter<string>`            |
| __onLoad__            | Triggered when an image or file is successfully loaded. | `EventEmitter<File>` or `EventEmitter<string>` |
| __onReset__           | Triggered when the component is reset or cleared.  | `EventEmitter<void>`              |
| __onUpload__          | Triggered when a file is successfully uploaded.    | `EventEmitter<File>` or `EventEmitter<string>` |

## License

[MIT](https://choosealicense.com/licenses/mit/)


## Authors

- [@octokatherine](https://www.github.com/octokatherine)

