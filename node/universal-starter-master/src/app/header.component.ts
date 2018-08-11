import { Component, OnInit, ElementRef, Renderer2, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from "@angular/common";

import { Observable } from 'rxjs';
import 'rxjs/add/operator/throttleTime';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  host: {
    'role': 'header'
  },
  animations: []
})
export class HeaderComponent implements OnInit {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject('WINDOWREF') private windowRef: any,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    Observable.fromEvent(this.windowRef, 'scroll')
    .auditTime(10)
    .map(
      () => (this.windowRef.pageYOffset || this.windowRef.scrollY) > 100
    )
    .distinctUntilChanged()
    .subscribe(
      (sticky) => {
        if (sticky) {
          this.renderer.addClass(this.elementRef.nativeElement, 'sticky');
        } else {
          this.renderer.removeClass(this.elementRef.nativeElement, 'sticky');
        }
      }
    );
  }

}