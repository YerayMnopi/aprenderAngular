import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from "@angular/common";
import { environment } from '../../environments/environment';


// Models
import { User } from '../shared/models/user';

@Injectable()
export class AnalyticsService {

  dataLayer: any;

  dataLayerExists = false;

  constructor(
    @Inject('WINDOWREF') private windowRef: any,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.getDataLayer();
  }


  getDataLayer() {
    if (isPlatformBrowser(this.platformId) && environment.production) {
      this.dataLayer = this.windowRef && this.windowRef.dataLayer;
      this.dataLayer.push('js', new Date());
    }
  }

  sendPageView(path: string) {
    if (this.dataLayer) {
      this.dataLayer.push('config', 'UA-122237967-1', {'page_path': '/' + path });
    }
  }
}