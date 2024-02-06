export class DropfileOptions {
  constructor(options: DropfileOptions = {}) {
    Object.assign(this, options);
    this.messages = { ...this.dmessages, ...options.messages };
    this.errors = { ...this.derrors, ...options.errors };
  }

  defaultFile?: string = '';
  maxFileSize?: number = 1;
  minWidth?: number = 0;
  maxWidth?: number = 0;
  minHeight?: number = 0;
  maxHeight?: number = 0;
  showRemove?: boolean = false;
  showLoader?: boolean = false;
  showErrors?: boolean = false;
  formatsAccepted?: string[] = ['png', 'jpg', 'jpeg', 'docx', 'pdf'];
  messages?: {
    button?: string;
    default?: string;
    formats?: string;
    replace?: string;
    add?: string;
  } = {
    button: 'Browse file',
    default: 'Choose a file or drag and drop it here',
    formats: '',
    replace: 'Click to replace file',
    add: 'Click to add a new file',
  };
  errors?: {
    default?: string;
    filesize?: string;
    formats?: string;
  } = {
    default: 'Ooops; something wrong happened.',
    filesize: 'Some files are too big. Max size: <maxFileSize> MB',
    formats: "Some files don't match the valid formats.",
  };
  multiple?: boolean = false;
  showFileList?: boolean = true;

  private dmessages?: {
    button: string;
    default: string;
    formats: string;
    replace: string;
    add: string;
  } = {
    button: 'Browse file',
    default: 'Choose a file or drag and drop it here',
    formats: 'Only <formats> formats accepted.',
    replace: 'Click to replace file',
    add: 'Click to add a new file',
  };

  private derrors?: {
    default: string;
    filesize: string;
    formats: string;
  } = {
    default: 'Ooops; something wrong happened.',
    filesize: 'Some files are too big. Max file size: <maxFileSize> MB',
    formats: "Some files don't match the valid formats.",
  };
}
