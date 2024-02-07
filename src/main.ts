import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { NgDropfileModule } from './dropfile/ng-dropfile.module';
import { DevModule } from './dropfile-develop/dev.module';


platformBrowserDynamic().bootstrapModule(DevModule)
  .catch(err => console.error(err));
