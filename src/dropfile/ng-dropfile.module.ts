import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DropfileComponent } from './ng-dropfile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgIconsModule } from '@ng-icons/core';
import {
  featherUploadCloud,
  featherFile,
  featherTrash2,
  featherImage,
} from '@ng-icons/feather-icons';

@NgModule({
  declarations: [DropfileComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgIconsModule.withIcons({
      featherUploadCloud,
      featherFile,
      featherTrash2,
      featherImage,
    }),
  ],
  exports: [DropfileComponent],
})
export class NgDropfileModule {}
