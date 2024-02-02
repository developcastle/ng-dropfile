export class DropfileOptions {
  defaultFile?: string;
  maxFileSize?: number;
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  showRemove?: boolean;
  showLoader?: boolean;
  showErrors?: boolean;
  formatsAccepted?: string[];
  messages?: {
    description?: string;
    formats?: string;
    replace?: string;
  };
  errors?: {
    default: string;
    filesize: string;
    formats: string;
  };
  multiple?: boolean;
  showFileList?: boolean;
}

export class DropfileDefaultOptions extends DropfileOptions {
  constructor() {
    super(); // 
    this.defaultFile = '';
    this.maxFileSize = 0.6;
    this.minWidth = 0;
    this.maxWidth = 0;
    this.minHeight = 0;
    this.maxHeight = 0;
    this.multiple = true;
    this.showRemove = true;
    this.showLoader = true;
    this.showErrors = true;
    this.showFileList = true;
    this.formatsAccepted = ['png', 'jpg', 'jpeg', 'gif', 'pdf'];
    this.messages = {
      description: 'Choose a file or drag and drop it here',
      formats: '',
      replace: 'Click to replace',
    };
    this.errors = {
      default: 'Ooops; something wrong happened.',
      filesize: 'Some files are too big.',
      formats: 'Some files don\'t match the valid formats.',
    };
  }
}
