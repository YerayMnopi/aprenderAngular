import { OnInit, Component, Input, Output, EventEmitter,
  Inject, ElementRef, Renderer2, PLATFORM_ID, ChangeDetectionStrategy } from '@angular/core';
import { isPlatformServer } from "@angular/common";
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'shared-section',
  templateUrl: './section.component.html',
  styleUrls: ['section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionComponent implements OnInit {

  @Input() set backgroundImage(backgroundImage) {
    this.setBackgroundImage(backgroundImage);
  };
  @Input() imageAuthor: string;
  @Input() heading = '';
  @Input() subheading = '';
  @Input() buttonText = '';
  @Input() topClipPath = false;
  @Input() bottomClipPath = true;
  @Output() buttonClicked = new EventEmitter<void>();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    this.setClipPath();
  }

  emitButtonClicked() {
    this.buttonClicked.emit();
  }

  setBackgroundImage(backgroundImage) {
    const sufix = this.getBackgroundImageSufix();
    const type = '.jpg';
    const apiUrl = environment.apiUrl + 'media/images/';

    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'background-image',
      'url(' + apiUrl + backgroundImage + sufix + type + ')'
    );
  }

  setClipPath() {
    let polygon;

    if (!this.topClipPath && this.bottomClipPath) {
      polygon = '0 0, 100% 0, 100% 95%, 0% 100%';
    } else if (this.topClipPath && this.bottomClipPath) {
      polygon = '0 5%, 100% 0, 100% 95%, 0% 100%';
    } else if (this.topClipPath && !this.bottomClipPath){
      polygon = '0 5%, 100% 0, 100% 100%, 0% 100%';
    }

    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'clip-path',
      'polygon(' + polygon + ')'
    );
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      '-webkit-clip-path',
      'polygon(' + polygon + ')'
    );
  }


  private getBackgroundImageSufix() {
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
