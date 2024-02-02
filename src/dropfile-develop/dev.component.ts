import { Component, ViewChild } from '@angular/core';
import { DropfileOptions } from 'src/dropfile/ng-dropfile';
import { DropfileComponent } from 'src/dropfile/ng-dropfile.component';

@Component({
  selector: 'app-dev',
  templateUrl: './dev.component.html'
})
export class DevComponent {


  @ViewChild(DropfileComponent) hijoComponent: DropfileComponent;

  constructor(){

    
  }

  clear(){
    this.hijoComponent.clear();
  }
}
