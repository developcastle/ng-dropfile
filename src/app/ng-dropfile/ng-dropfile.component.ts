import {
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
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
export class FileuploadComponent implements IFileUploadConfig, OnInit {
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
  imagenSeleccionada: string = '';
  selectedFiles: File[] = [];
  displayImage: boolean = false;

  onDrop(event: any): void {
    event.preventDefault();
    const files: File[] = event.dataTransfer.files;
    this.verifyFiles(files);
    event.stopPropagation();
  }

  onUpload(): void {
    const formData = new FormData();
    for (const file of this.selectedFiles) {
      formData.append('files', file, file.name);
    }
  }
  onDragOver(event: any) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
    event.stopPropagation();
  }

  triggerFileInput(fileInput: HTMLInputElement): void {
    fileInput.click();
  }

  onFileSelect(event: any): void {
    const files: FileList = event.target.files;
    this.verifyFiles(files);
  }

  verifyFiles(files: File[] | FileList) {
    if (files) {
      const archivosNoValidos = Array.from(files).filter(
        (file) => file.size > this.maxFileSize
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
    }
  }

  isValidFileExtension(fileName: string): boolean {
    const extension = fileName.split('.').pop()?.toLowerCase();
    return extension ? this.formatsAccepted.includes(extension) : false;
  }

  getFileExtension(fileName: string): string {
    return fileName.split('.').pop()?.toLowerCase() || '';
  }
  someCondition: boolean = true;
  removeFile(index: number) {
    this.someCondition = true;
    this.selectedFiles.splice(index, 1);
    if (this.selectedFiles.length == 0) this.displayImage = false;
  }

  formatFileSize(bytes: number): string {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(
      Math.floor(Math.log(bytes) / Math.log(1024)).toString(),
      10
    );
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + ' ' + sizes[i];
  }

  generateAcceptAttribute(): string {
    return this.formatsAccepted.map((ext) => `.${ext}`).join(',');
  }

  generateFormatMessage(): string {
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

  isImageFile(file: File): boolean {
    return file.type.startsWith('image/');
  }
}
