import { Component, OnInit, ElementRef, Renderer2, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from "@angular/common";

import { fromEvent } from 'rxjs';
import { auditTime, map, takeWhile, distinctUntilChanged } from 'rxjs/operators';
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
    fromEvent(this.windowRef, 'scroll').pipe(
      auditTime(10),
      map(
        () => (this.windowRef.pageYOffset || this.windowRef.scrollY) > 100
      ),
      distinctUntilChanged()
    )
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