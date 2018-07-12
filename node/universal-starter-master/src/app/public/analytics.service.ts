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

  gtag(params: any){
    if (this.dataLayer) {
      this.dataLayer.push(params);
    }
  }

  getDataLayer() {
    if (isPlatformBrowser(this.platformId) && environment.production) {
      this.dataLayer = this.windowRef && this.windowRef.dataLayer;
      this.gtag({
        '0': 'js',
        '1': new Date(),
        'length': 2
      });
    }
  }

  sendPageView(path: string) {
    this.gtag({
      '0':'config',
      '1': 'UA-122237967-1',
      '2': {'page_path': '/' + path},
      'length': 3
    });
  }
}