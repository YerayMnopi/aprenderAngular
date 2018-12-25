import { OnInit, Component, Input, Output, EventEmitter,
  Inject, ElementRef, Renderer2, PLATFORM_ID,
  ChangeDetectionStrategy, OnDestroy} from '@angular/core';
import { isPlatformServer } from "@angular/common";
import { environment } from '../../../../environments/environment';
import { BrowserWindowService } from '../../../core/browser-window.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'shared-section',
  templateUrl: './section.component.html',
  styleUrls: ['section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'role': 'section'
  }
})
export class SectionComponent implements OnInit, OnDestroy {
  private subscriptionsActive = true;
  private viewportSize: string;
  private viewportOrientation: string;
  private backgroundImageId: string;

  @Input() imageAuthor: string;
  @Input() heading: string;
  @Input() subheading: string;
  @Input() buttonText: string;
  @Output() buttonClicked = new EventEmitter<void>();

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private browserWindowService: BrowserWindowService
  ) { }

  ngOnInit() {
    this.browserWindowService.getViewportWidthChanges().pipe(
      takeWhile(() => this.subscriptionsActive)
    ).subscribe((viewportSize: string) => {
      this.viewportSize = viewportSize;
      this.setBackgroundImage();
    });

    this.browserWindowService.getViewportOrientationChanges().pipe(
      takeWhile(() => this.subscriptionsActive)
    ).subscribe((viewportOrientation: string) => {
      this.viewportOrientation = viewportOrientation;
      this.setBackgroundImage();
    });
  }

  ngOnDestroy() {
    this.subscriptionsActive = false;
  }

  emitButtonClicked() {
    this.buttonClicked.emit();
  }

  @Input() set backgroundImage(backgroundImage: string) {
    this.backgroundImageId = backgroundImage;
    this.setBackgroundImage();
  }

  private getBackgroundImageSufix(): string {
    if (isPlatformServer(this.platformId)) {
      return '-desktop';
    } else {
      let sufix =  '-' + this.viewportSize;

      if (this.viewportOrientation === 'portrait') {
        sufix += '-portrait';
      }
      return sufix;
    }
  }

  private composeImageUrl(): string {
    const type = '.jpg';
    const apiUrl = environment.mediaUrl + 'media/images/';

    return apiUrl + this.backgroundImageId + this.getBackgroundImageSufix() + type;
  }

  private setBackgroundImage() {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'background-image',
      'url(' + this.composeImageUrl() + ')'
    );
  }
}
