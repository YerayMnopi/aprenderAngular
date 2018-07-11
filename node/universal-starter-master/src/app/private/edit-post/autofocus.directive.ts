import { Directive, OnInit, ElementRef } from '@angular/core';
import { environment } from '../../../environments/environment';

@Directive({
  selector: '[editPostAutofocus]'
})
export class AutofocusDirective implements OnInit {
  private NEW_ELEMENT_CODE = environment.newElementCode;

  constructor(
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.elementRef.nativeElement.focus();
    setTimeout(() => {
      if (this.elementRef.nativeElement.value === this.NEW_ELEMENT_CODE) {
        this.elementRef.nativeElement.setSelectionRange(0, this.elementRef.nativeElement.value.length);
      }
    },
      100
    );
  }
}