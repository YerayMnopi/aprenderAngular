import {Component, OnInit, PLATFORM_ID, Inject} from '@angular/core';
import { LocationStrategy, isPlatformBrowser, isPlatformServer } from "@angular/common";
import { Router, NavigationEnd } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isPopState = false;

  constructor(
      private router: Router,
      private locationStrategy: LocationStrategy,
      @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit() {
    this.scrollTopOnNavigation();
  }


  private scrollTopOnNavigation() {
    if (isPlatformServer(this.platformId)) {
      return;
    }

    this.locationStrategy.onPopState(() => {
      this.isPopState = true;
    });

    this.router.events.subscribe(event => {
      // Scroll to top if accessing a page, not via browser history stack
      if (event instanceof NavigationEnd && !this.isPopState) {
        window.scrollTo(0, 0);
        this.isPopState = false;
      }

      // Ensures that isPopState is reset
      if (event instanceof NavigationEnd) {
        this.isPopState = false;
      }
    });
  }
}
