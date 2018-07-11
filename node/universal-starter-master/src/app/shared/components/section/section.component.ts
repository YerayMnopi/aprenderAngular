import { Component, Input, Output, EventEmitter, ViewEncapsulation, Inject, ViewChild, HostBinding, ElementRef, Renderer2, PLATFORM_ID, ChangeDetectionStrategy } from '@angular/core';
import { isPlatformServer } from "@angular/common";
import { environment } from '../../../../environments/environment'

@Component({
  selector: 'shared-section',
  templateUrl: './section.component.html',
  styleUrls: ['section.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionComponent {

  @Input() set backgroundImage(backgroundImage) {
    this.setBackgroundImage(backgroundImage);
  };
  @Input() imageAuthor: string;
  @Input() heading = '';
  sectionStyle = {};
  @Input() subheading = '';
  @Input() buttonText = '';
  @Input() external = true;
  @Output() buttonClicked = new EventEmitter<void>();
  @ViewChild('background') background: ElementRef;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2
  ) {}

  emitButtonClicked() {
    this.buttonClicked.emit();
  }

  setBackgroundImage(backgroundImage) {
    const sufix = this.getBackgroundImageSufix();
    const type = '.jpg';
    const apiUrl = environment.apiUrl + 'media/images/';

    this.renderer.setStyle(
      this.background.nativeElement,
      'background-image',
      'url(' + apiUrl + backgroundImage + sufix + type + ')'
    );
  }


  getBackgroundImageSufix() {
    if (isPlatformServer(this.platformId)) {
      return '-desktop';
    }

    const witdh = window.innerWidth;

    if (witdh <= 768) {
      return '-tablet';
    } else {
      return '-desktop';
    }
  }

}
