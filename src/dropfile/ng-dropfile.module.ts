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
import { DevComponent } from 'src/dropfile-develop/dev.component';

@NgModule({
  declarations: [DropfileComponent,DevComponent],
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
  bootstrap:[DevComponent]
})
export class NgDropfileModule {}
