import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DropfileOptions } from './ng-dropfile';
import { trigger, transition, animate, style } from '@angular/animations';

export const fadeOutAnimation = trigger('fadeOut', [
  transition(':leave', [animate('0.5s', style({ opacity: 0 }))]),
]);

@Component({
  selector: 'ng-dropfile',
  templateUrl: './ng-dropfile.component.html',
  styleUrls: ['./ng-dropfile.component.scss'],
  animations: [fadeOutAnimation],
})
export class DropfileComponent implements DropfileOptions, OnInit {
  //Events emitters
  @Output() onSelect: EventEmitter<File[]> = new EventEmitter<File[]>();
  @Output() onDelete: EventEmitter<File> = new EventEmitter<File>();
  @Output() onClear: EventEmitter<void> = new EventEmitter<void>();
  @Output() onError: EventEmitter<string> = new EventEmitter<string>();

  //Options
  @Input() maxFileSize: number;
  @Input() showRemove: boolean;
  @Input() showLoader: boolean;
  @Input() showErrors: boolean;
  @Input() formatsAccepted: string[];
  @Input() messages: any;
  @Input() errors: any;
  @Input() multiple: boolean;
  @Input() showFileList: boolean;

  constructor() {
    const defaultValues: DropfileOptions = new DropfileOptions();
    Object.assign(this, defaultValues);
  }

  protected error: string;
  protected animatedRemove: boolean = true;
  protected selectedImage: boolean = false;
  protected imagenSeleccionada: string = '';
  protected selectedFiles: File[] = [];
  protected selectedFile: File;
  protected displayImage: boolean = false;

  ngOnInit(): void {
    this.messages.formats = this.generateFormatMessage();
    this.errors.filesize = this.generateFilesizeErrorMessage();
  }

  protected onDrop(event: any): void {
    event.preventDefault();
    const files: File[] = event.dataTransfer.files;
    this.verifyFiles(files);
    event.stopPropagation();
  }

  protected onDragOver(event: any) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
    event.stopPropagation();
  }

  protected triggerFileInput(fileInput: HTMLInputElement): void {
    fileInput.click();
  }

  protected onFileSelect(event: any): void {
    const files: File[] = event.target.files;
    if (files) this.verifyFiles(files);
  }

  protected verifyFiles(files: File[]) {
    this.error = '';
    this.displayImage = false;
    if (files.length == 0) return;

    //Controling the multiples files not allowed
    if (!this.multiple) {
      if (files.length > 1) {
        this.error = 'Multiples files not allowed';
        this.onError.emit('Multiples files not allowed');
        return;
      }
    }

    //Controling the invalid files
    const invalidSizeFiles = Array.from(files).filter(
      (file) => this.bytesToMB(file.size) > this.maxFileSize
    );
    if (invalidSizeFiles.length > 0) {
      this.error = this.errors.filesize;
      this.onError.emit(this.errors.filesize);
      return;
    }

    //Controling the invalid files
    const invalidFormatFiles = Array.from(files).filter(
      (file) => !this.isValidFileExtension(file.name)
    );
    if (invalidFormatFiles.length > 0) {
      this.error = this.errors.formats;
      this.onError.emit(this.errors.formats);
      return;
    }

    //Removed the duplicated files
    files = Array.from(files).filter((e) => !this.fileExists(e));

    let file = files[0];

    //Controling the multiples files behaivor
    if (!this.multiple) {
      this.selectedFile = file;
      this.selectedFiles[0] = file;
    } else {
      this.selectedFiles.push(...Array.from(files));
    }

    // We select the first element of selected files 
    this.select(file);
    this.onSelect.emit(files);
  }
  protected bytesToMB(bytes: number): number {
    return bytes / (1024 * 1024);
  }

  protected select(file:File){
    this.error ='';
    this.displayImage = true;
    this.selectedFile = file;
    if (this.isImageFile(file)) {
      this.selectedImage = true;
      this.imagenSeleccionada = URL.createObjectURL(file);
    } else this.selectedImage = false;
  }

  fileExists(archivo: File) {
    return this.selectedFiles.some(
      (ef) => ef.name === archivo.name && ef.size === archivo.size
    );
  }

  protected isValidFileExtension(fileName: string): boolean {
    const extension = fileName.split('.').pop()?.toLowerCase();
    return extension ? this.formatsAccepted.includes(extension) : false;
  }

  protected getFileExtension(fileName: string): string {
    return fileName.split('.').pop()?.toLowerCase() || '';
  }

  protected removeFile(index: number, file: File) {
    this.onDelete.emit(file);   
    this.animatedRemove = true;
    this.selectedFiles.splice(index, 1);
    if(file == this.selectedFile){
      this.select(this.selectedFiles[0]);
    }
    if (this.selectedFiles.length == 0) this.displayImage = false;
  }

  protected formatFileSize(bytes: number): string {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(
      Math.floor(Math.log(bytes) / Math.log(1024)).toString(),
      10
    );
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + ' ' + sizes[i];
  }

  protected generateAcceptAttribute(): string {
    return this.formatsAccepted.map((ext) => `.${ext}`).join(',');
  }

  protected generateFormatMessage(): string {
    const formatNames = this.formatsAccepted.map((ext) => ext.toUpperCase());
    let text = '';
    if (formatNames.length === 1) {
      text = formatNames[0];
    } else if (formatNames.length === 2) {
      text = formatNames.join(' and ');
    } else {
      const lastFormat = formatNames.pop();
      text = `${formatNames.join(', ')}, and ${lastFormat}`;
    }
    return this.messages.formats.replace('<formats>', text);
  }
  generateFilesizeErrorMessage(): string {
    return String(this.errors.filesize).replace(
      '<maxFileSize>',
      this.maxFileSize.toString()
    );
  }

  protected isImageFile(file: File): boolean {
    if (file) return file.type.startsWith('image/');
    else return false;
  }

  /**
   * Remove all files of the component
   */
  public clear(): void {
    this.selectedFiles = [];
    this.displayImage = false;
    this.onClear.emit();
  }

  /**
   * Get the selected files
   */
  public getFiles(): File[] {
    return this.selectedFiles;
  }
}
