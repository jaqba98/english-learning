import { bootstrapApplication } from '@angular/platform-browser';

import {
  FeMainComponent,
  feMainConfig,
} from '@english-learning/fe-main';

bootstrapApplication(FeMainComponent, feMainConfig).catch(err => {
  throw new Error(err);
});
