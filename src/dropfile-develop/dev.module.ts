import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevComponent } from 'src/dropfile-develop/dev.component';
import { NgDropfileModule } from 'src/dropfile/ng-dropfile.module';


@NgModule({
  declarations: [
    DevComponent
  ],
  imports: [
    CommonModule,    
    NgDropfileModule
  ],
  bootstrap:[DevComponent]
})
export class DevModule { }
