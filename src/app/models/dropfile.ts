export interface IDropfile {
  defaultFile?: string,
  maxFileSize?: number,
  minWidth?: number,
  maxWidth?: number,
  minHeight?: number,
  maxHeight?: number,
  showRemove?: boolean,
  showLoader?: boolean,
  showErrors?: boolean,
  formatsAccepted?: string[],
  messages?: {
    description?: string,
    formats?: string,
    replace?: string
  },
  errors?: {
    filesize: string,
    formats: string
  },
  multiple?: boolean,
  showFileList?: boolean
}

export class DropfileDefaults implements IDropfile {
  defaultFile = '';
  maxFileSize = 0.6;
  minWidth = 0;
  maxWidth = 0;
  minHeight = 0;
  maxHeight = 0;
  multiple = true;
  showRemove = true;
  showLoader = true;
  showErrors = true;
  showFileList = true;
  formatsAccepted = ['png', 'jpg', 'jpeg', 'gif', 'pdf'];
  messages= {
    description: 'Choose a file or drag and drop it here',
    formats: '',
    replace: 'Click to replace'
  };
  errors? = {
    default: 'Ooops; something wrong happended.',
    filesize: 'Some files are too big.',
    formats: 'Some files doesn´t match the valid formats.'
  };
}
/*
    error: {
        fileSize: 'The file size is too big ({{ value }} max).';
        minWidth: 'The image width is too small ({{ value }}}px min).';
        maxWidth: 'The image width is too big ({{ value }}}px max).';
        minHeight: 'The image height is too small ({{ value }}}px min).';
        maxHeight: 'The image height is too big ({{ value }}px max).';
        imageFormat: 'The image format is not allowed ({{ value }} only).';
        fileExtension: 'The file is not allowed ({{ value }} only).'
    };*/
