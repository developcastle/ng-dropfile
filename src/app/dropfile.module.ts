import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DropfileComponent } from './ng-dropfile/ng-dropfile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgIconsModule } from '@ng-icons/core';
import { featherUploadCloud, featherFile ,featherTrash2,featherImage} from '@ng-icons/feather-icons';


@NgModule({
  declarations: [
    AppComponent,
    DropfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgIconsModule.withIcons({ featherUploadCloud ,featherFile,featherTrash2,featherImage}),
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent]
})
export class DropfileModule { }
