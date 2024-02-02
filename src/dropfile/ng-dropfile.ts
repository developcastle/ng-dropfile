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
  formatsAccepted?: string[] = ['png', 'jpg', 'jpeg', 'gif', 'pdf'];
  messages?: {
    default?: string;
    formats?: string;
    replace?: string;
  } = {
    default: 'Choose a file or drag and drop it here',
    formats: '',
    replace: 'Click to replace',
  };
  errors?: {
    default?: string;
    filesize?: string;
    formats?: string;
  } = {
    default: 'Ooops; something wrong happened.',
    filesize: 'Some files are too big.',
    formats: "Some files don't match the valid formats.",
  };
  multiple?: boolean = true;
  showFileList?: boolean = true;

  private dmessages?: {
    default: string;
    formats: string;
    replace: string;
  } = {
    default: 'Choose a file or drag and drop it here',
    formats: 'Only <formats> formats accepted.',
    replace: 'Click to replace',
  };

  private derrors?: {
    default: string;
    filesize: string;
    formats: string;
  } = {
    default: 'Ooops; something wrong happened.',
    filesize: 'Some files are too big.',
    formats: "Some files don't match the valid formats.",
  };
}
