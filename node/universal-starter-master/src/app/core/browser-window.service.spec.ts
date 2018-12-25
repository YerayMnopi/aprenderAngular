import { TestBed, inject } from '@angular/core/testing';

import { BrowserWindowService } from './browser-window.service';

describe('BrowserWindow.ServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BrowserWindowService,
        { provide: 'WINDOWREF', useFactory: getWindowRef },

      ]
    });
  });

  it('should be created', inject([BrowserWindowService], (service: BrowserWindowService) => {
    expect(service).toBeTruthy();
  }));


  it('should detect orientation', inject([BrowserWindowService], (service: BrowserWindowService) => {
    expect(service['getViewportOrientation']()).toBe('landscape');
    service['_windowRef'].nativeWindow.innerWidth = 300;
    expect(service['getViewportOrientation']()).toBe('portrait');
    service['_windowRef'].nativeWindow.innerWidth = 440;
    expect(service['getViewportOrientation']()).toBe('portrait');


  }));

  it('should detect viewport size', inject([BrowserWindowService], (service: BrowserWindowService) => {
    expect(service['getViewportSize']()).toBe('phone');
    service['_windowRef'].nativeWindow.innerWidth = 800;
    expect(service['getViewportSize']()).toBe('tablet');
    service['_windowRef'].nativeWindow.innerWidth = 1400;
    expect(service['getViewportSize']()).toBe('desktop');
  }));
});


export function getWindowRef() {
  return { 
    innerHeight: 440,
    innerWidth: 600
  };
}