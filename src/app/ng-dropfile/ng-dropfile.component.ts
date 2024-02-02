import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {
  IFileUploadConfig,
  FileUploadConfigDefaults,
} from '../models/fileInputOptions';
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
export class DropfileComponent implements IFileUploadConfig, OnInit {

  @Output() onSelectedFiles: EventEmitter<File[] | FileList> = new EventEmitter<File[] | FileList>();
  @Output() onDelete: EventEmitter<File> = new EventEmitter<File>();

  def: FileUploadConfigDefaults = new FileUploadConfigDefaults();
  @Input() defaultFile: string = this.def.getDefault('defaultFile');
  @Input() maxFileSize: number = this.def.getDefault('maxFileSize');
  @Input() minWidth: number = this.def.getDefault('minWidth');
  @Input() maxWidth: number = this.def.getDefault('maxFileSize');
  @Input() minHeight: number = this.def.getDefault('minHeight');
  @Input() maxHeight: number = this.def.getDefault('maxHeight');
  @Input() showRemove: boolean = this.def.getDefault('showRemove');
  @Input() showLoader: boolean = this.def.getDefault('showLoader');
  @Input() showErrors: boolean = this.def.getDefault('showErrors');
  @Input() formatsAccepted: string[] = this.def.getDefault('formatsAccepted');

  @Input() message: string = this.def.getDefault('message');
  @Input() formatsMessage: string = this.def.getDefault('formatsMessage');
  @Input() msgError: string = this.def.getDefault('msgError');
  @Input() msgReplace: string = this.def.getDefault('msgReplace');
  @Input() multiple: boolean = this.def.getDefault('multiple');
  @Input() showFileList: boolean = this.def.getDefault('showFileList');

  constructor() {}

  ngOnInit(): void {
    if (this.formatsMessage == '')
      this.formatsMessage = this.generateFormatMessage();
  }
  protected imagenSeleccionada: string = '';
  selectedFiles: File[] = [];
  protected displayImage: boolean = false;

  protected onDrop(event: any): void {
    event.preventDefault();
    const files: File[] = event.dataTransfer.files;
    this.verifyFiles(files);
    event.stopPropagation();
  }

  protected onUpload(): void {
    const formData = new FormData();
    for (const file of this.selectedFiles) {
      formData.append('files', file, file.name);
    }
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
    const files: FileList = event.target.files;
    this.verifyFiles(files);
  }

  protected verifyFiles(files: File[] | FileList) {
    if (files) {
      const archivosNoValidos = Array.from(files).filter(
        (file) => this.bytesToMB(file.size) > this.maxFileSize
      );
      if (archivosNoValidos.length > 0) {
        alert('Algunos archivos pesan demasiado');
        return;
      }
      this.imagenSeleccionada = URL.createObjectURL(files[0]);
      if (this.selectedFiles.length > 0) {
        this.selectedFiles.push(...Array.from(files));
      } else {
        this.selectedFiles = Array.from(files);
        let file = this.selectedFiles[0];
        if (this.selectedFiles.length == 1 && this.isImageFile(file)) {
          this.imagenSeleccionada = URL.createObjectURL(file);
          this.displayImage = true;
        } else {
          this.displayImage = false;
        }
      }
      
      this.onSelectedFiles.emit(files);        
    }
  }
  protected bytesToMB(bytes: number): number {
    return bytes / (1024 * 1024);
  }

  
  protected isValidFileExtension(fileName: string): boolean {
    const extension = fileName.split('.').pop()?.toLowerCase();
    return extension ? this.formatsAccepted.includes(extension) : false;
  }

  protected getFileExtension(fileName: string): string {
    return fileName.split('.').pop()?.toLowerCase() || '';
  }
  someCondition: boolean = true;
  protected  removeFile(index: number,file:File) {
    this.onDelete.emit(file);
    this.someCondition = true;
    this.selectedFiles.splice(index, 1);
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

    if (formatNames.length === 1) {
      return formatNames[0];
    } else if (formatNames.length === 2) {
      return formatNames.join(' and ');
    } else {
      const lastFormat = formatNames.pop();
      return `${formatNames.join(', ')}, and ${lastFormat} formats accepted.`;
    }
  }

  protected isImageFile(file: File): boolean {
    return file.type.startsWith('image/');
  }

  /**
   * Remove all files of the component
   */
  public clear(): void {
   this.selectedFiles=[];
   this.displayImage= false;
  }

}
