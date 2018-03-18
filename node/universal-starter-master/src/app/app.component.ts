import { Component, OnInit } from '@angular/core';
import { LocationStrategy } from "@angular/common";
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
  ) { }

  ngOnInit() {
    this.scrollTopOnNavigation();
  }


  private scrollTopOnNavigation() {
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
