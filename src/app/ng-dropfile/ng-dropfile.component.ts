import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IDropfile, DropfileDefaults } from '../models/dropfile';
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
export class DropfileComponent implements IDropfile, OnInit {
  //Events
  @Output() onSelect: EventEmitter<File[] | FileList> = new EventEmitter<
    File[] | FileList
  >();
  @Output() onDelete: EventEmitter<File> = new EventEmitter<File>();
  @Output() onClear: EventEmitter<void> = new EventEmitter<void>();
  @Output() onError: EventEmitter<string> = new EventEmitter<string>();

  //Properties

  @Input() defaultFile: string;
  @Input() maxFileSize: number;
  @Input() minWidth: number;
  @Input() maxWidth: number;
  @Input() minHeight: number;
  @Input() maxHeight: number;
  @Input() showRemove: boolean;
  @Input() showLoader: boolean;
  @Input() showErrors: boolean;
  @Input() formatsAccepted: string[];
  @Input() messages: any;
  @Input() error: any;
  @Input() multiple: boolean;
  @Input() showFileList: boolean;

  constructor() {
    const defaultValues: IDropfile = new DropfileDefaults();
    Object.assign(this, defaultValues);
  }

  ngOnInit(): void {
    if (this.messages.formats == '')
      this.messages.formats = this.generateFormatMessage();
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
        this.onError.emit('Some files are too big.');
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

      this.onSelect.emit(files);
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
  protected removeFile(index: number, file: File) {
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
    this.selectedFiles = [];
    this.displayImage = false;
    this.onClear.emit();
  }
}
