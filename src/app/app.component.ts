import { Component, ViewChild } from '@angular/core';
import { DropfileComponent } from './ng-dropfile/ng-dropfile.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FileUpload';
  @ViewChild('DropfileComponent') DropfileComponent: DropfileComponent = new DropfileComponent();


  resetChildComponent(): void {
    // Llamando al método del componente hijo
    this.DropfileComponent.maxHeight;
  }
}
