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
    filesize: string;
    formats: string;
  };
  multiple?: boolean;
  showFileList?: boolean;
}

export class DropfileDefaultOptions extends DropfileOptions {
  override defaultFile = '';
  override maxFileSize = 0.6;
  override minWidth = 0;
  override maxWidth = 0;
  override minHeight = 0;
  override maxHeight = 0;
  override multiple = true;
  override showRemove = true;
  override showLoader = true;
  override showErrors = true;
  override showFileList = true;
  override formatsAccepted = ['png', 'jpg', 'jpeg', 'gif', 'pdf'];
  override messages = {
    description: 'Choose a file or drag and drop it here',
    formats: '',
    replace: 'Click to replace',
  };
  override errors? = {
    default: 'Ooops; something wrong happended.',
    filesize: 'Some files are too big.',
    formats: 'Some files doesn´t match the valid formats.',
  };
}
