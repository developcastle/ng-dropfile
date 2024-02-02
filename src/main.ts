import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { NgDropfileModule } from './dropfile/ng-dropfile.module';


platformBrowserDynamic().bootstrapModule(NgDropfileModule)
  .catch(err => console.error(err));
