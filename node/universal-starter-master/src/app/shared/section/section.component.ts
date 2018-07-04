import { Component, OnInit, Input, ViewEncapsulation, Inject, ViewChild, HostBinding, ElementRef, Renderer2, PLATFORM_ID, ChangeDetectionStrategy } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from "@angular/common";
import { environment } from '../../../environments/environment'

@Component({
  selector: 'shared-section',
  templateUrl: './section.component.html',
  styleUrls: ['section.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionComponent implements OnInit{

  @Input() backgroundImage: string;
  @Input() imageAuthor: string;
  @Input() heading = '';
  sectionStyle = {};
  @Input() subheading = '';
  @Input() buttonText = '';
  @Input() external = true;
  imageDirPath = '/assets/images/';
  @ViewChild('background') background: ElementRef;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.setBackgroundImage();
  }

  setBackgroundImage() {
    const sufix = this.getBackgroundImageSufix();
    const type = '.jpg';
    const apiUrl = environment.apiUrl + 'media/images/';

    this.renderer.setStyle(
      this.background.nativeElement,
      'background-image',
      'url(' + apiUrl + this.backgroundImage + sufix + type + ')'
    );
  }


  getBackgroundImageSufix() {
    if (isPlatformServer(this.platformId)) {
      return '-desktop';
    }

    const witdh = window.innerWidth;

    if (witdh <= 400) {
      return '-thumbnail';
    } else if (witdh <= 800) {
      return '-tablet';
    } else {
      return '-desktop';
    }
  }

  getImagePath() {
    return this.external ? this.backgroundImage : this.imageDirPath + this.backgroundImage;
  }

}
