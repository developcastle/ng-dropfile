import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import {
  IFileUploadConfig,
  FileUploadConfigDefaults,
} from '../models/fileInputOptions';

@Component({
  selector: 'ng-dropfile',
  templateUrl: './ng-dropfile.component.html',
  styleUrls: ['./ng-dropfile.component.scss'],
  
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
  @Input() errorTimeout: number = this.def.getDefault('errorTimeout');
  @Input() formatsAccepted: string[] =
    this.def.getDefault('formatsAccepted');

  @Input() message: string = this.def.getDefault('message');
  @Input() formatsMessage: string = this.def.getDefault('formatsMessage');
  @Input() msgError: string = this.def.getDefault('msgError');
  @Input() msgReplace: string = this.def.getDefault('msgReplace');
  @Input() multiple: boolean = this.def.getDefault('multiple');  

  constructor() {}

  ngOnInit(): void {
    if(this.formatsMessage == '') this.formatsMessage = this.generateFormatMessage();
  }

  selectedFiles: File[] = [];

  onFileSelected(event: any): void {
    const files: File[] = event.target.files;
    this.selectedFiles = [...files];
  }

  onDragEnter(event: DragEvent): void {
    event.preventDefault();
    // Puedes agregar estilos visuales al entrar en el área de arrastre si lo deseas
  }

  onDragLeave(event: DragEvent): void {
    // Puedes restaurar los estilos visuales al salir del área de arrastre si lo deseas
  }

  onDrop(event: any): void {
    console.log(event);
    event.preventDefault();
    const files: File[] = event.dataTransfer.files;

    if (files) {  
      // Validar las extensiones
      const archivosValidos = Array.from(files).filter(file => this.isValidFileExtension(file.name));
  
      // Ahora puedes trabajar con los archivos válidos
      this.selectedFiles = [...archivosValidos];
  
      // Manejar los archivos no válidos (opcional)
      const archivosNoValidos = Array.from(files).filter(file => !this.isValidFileExtension(file.name));
      if (archivosNoValidos.length > 0) {
        console.log('Archivos no válidos:', archivosNoValidos);
        alert('Algunos archivos no son de las extensiones permitidas.');
      }
    }else{
     
    }
 
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

  handleFileSelect(event: any): void {
    const files: FileList = event.target.files; 
    console.log(event);
    this.selectedFiles = Array.from(files);


    
  }


  isValidFileExtension(fileName: string): boolean {
    const extension = fileName.split('.').pop()?.toLowerCase();
    return extension ? this.formatsAccepted.includes(extension) : false;
  }

  removeFile(index:number){
    this.selectedFiles.splice(index, 1);
  }


  
  formatFileSize(bytes: number): string {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];  
    if (bytes === 0) return '0 Byte';    
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)).toString(), 10);    
    return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + ' ' + sizes[i];
  }

  generateAcceptAttribute(): string {
    return this.formatsAccepted.map(ext => `.${ext}`).join(',');
  }

  generateFormatMessage(): string {
    const formatNames = this.formatsAccepted.map(ext => ext.toUpperCase());
  
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

