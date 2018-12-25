import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { debounceTime, startWith, map, distinctUntilChanged } from 'rxjs/operators';



import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class BrowserWindowService {

  /**
   * Valor de ancho en pixeles a partir del cual se debe mostrar el layout mobile
   */
  private mobileBreakPointPx = 768;

  /**
   * Valor de ancho en pixeles a partir del cual se debe mostrar el layout desktop
   */
  private tabletBreakPointPx = 1024;

  /**
   * Observable que ejecuta y emite el valor de checkIsMobile
   */
  private viewportWidthChanges: Observable<string>;

  /**
   * Observable que ejecuta y emite el valor de checkIsMobile
   */
  private viewportOrientationChanges: Observable<string>;

  constructor(
    @Inject('WINDOWREF') private _windowRef: any,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.createViewportWidthChanges();
      this.createViewportOrientationChanges();
    }
  }

  /**
   * Devuelve el objeto window
   */
  get() {
    return this._windowRef && this._windowRef.nativeWindow;
  }

  /**
   * Comprueba si el ancho de la pantalla es inferior al breakpoint para mobile
   */
  getViewportOrientation(): string {
    const viewportWidth = this.get().innerWidth;

    if (this.get().innerHeight >= this.get().innerWidth) {
      return 'portrait';
    } else {
      return 'landscape';
    };
  }

  /**
   * Comprueba si el ancho de la pantalla es inferior al breakpoint para mobile
   */
  getViewportSize(): string {
    const viewportWidth = this.get().innerWidth;

    if (viewportWidth <= this.mobileBreakPointPx) {
      return 'phone';
    } else if (this.mobileBreakPointPx < viewportWidth && viewportWidth <= this.tabletBreakPointPx) {
      return 'tablet';
    } else {
      return 'desktop';
    };
  }
  /**
   * Crea un observable que ejecuta y emite el valor de getViewportSize
   */
  private createViewportWidthChanges() {
    this.viewportWidthChanges = fromEvent(this.get(), 'resize').pipe(
      debounceTime(100),
      startWith(() => this.getViewportSize()),
      map(() => this.getViewportSize()),
      distinctUntilChanged()
    );
  }

    /**
   * Crea un observable que ejecuta y emite el valor de getViewportSize
   */
  private createViewportOrientationChanges() {
    this.viewportOrientationChanges = fromEvent(this.get(), 'resize').pipe(
      debounceTime(100),
      startWith(() => this.getViewportOrientation()),
      map(() => this.getViewportOrientation()),
      distinctUntilChanged()
    )
  }
}
