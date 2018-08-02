import { OnInit, Component, Input, Output, EventEmitter,
  Inject, ElementRef, Renderer2, PLATFORM_ID, ChangeDetectionStrategy } from '@angular/core';
import { isPlatformServer } from "@angular/common";
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'shared-section',
  templateUrl: './section.component.html',
  styleUrls: ['section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    ['role']: 'section'
  }
})
export class SectionComponent implements OnInit {
  @Input() imageAuthor: string;
  @Input() heading: string;
  @Input() subheading: string;
  @Input() buttonText: string;
  @Output() buttonClicked = new EventEmitter<void>();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    @Inject('WINDOWREF') private windowRef: any,
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
  }

  emitButtonClicked() {
    this.buttonClicked.emit();
  }

  @Input() set backgroundImage (backgroundImage) {
    const sufix = this.getBackgroundImageSufix();
    const type = '.jpg';
    const apiUrl = environment.apiUrl + 'media/images/';

    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'background-image',
      'url(' + apiUrl + backgroundImage + sufix + type + ')'
    );
  }

  private getBackgroundImageSufix() {
    if (isPlatformServer(this.platformId)) {
      return '-desktop';
    }

    const witdh = this.windowRef.innerWidth;

    if (witdh <= 768) {
      return '-tablet';
    } else {
      return '-desktop';
    }
  }

}
