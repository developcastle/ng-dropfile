export interface IFileUploadConfig {
    defaultFile?: string;
    maxFileSize?: number;
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    showRemove?: boolean; 
    showLoader?: boolean;
    showErrors?: boolean;
    formatsAccepted?: string[];//yes
    message?: string;//yes
    formatsMessage?: string;//yes
    msgReplace?: string;
    msgError?: string;
    multiple?: boolean;
    showFileList?: boolean;
}

export  class  FileUploadConfigDefaults implements IFileUploadConfig {
    defaultFile= '';
    maxFileSize= 0.6;
    minWidth= 0;
    maxWidth= 0;
    minHeight= 0;
    maxHeight= 0;
    multiple= true;
    showRemove= true;
    showLoader= true;
    showErrors= true;
    showFileList= true;
    formatsAccepted= ['png', 'jpg', 'jpeg', 'gif' ,'pdf'];
    message= 'Choose a file or drag and drop it here';
    formatsMessage= '';
    msgReplace= 'Drag and drop or click to replace';
    msgError= 'Ooops; something wrong happended.';

    public  getDefault(propertyName: keyof IFileUploadConfig): any {
        return this[propertyName];
      }
    
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
