import { Component, Input, Renderer2, OnInit, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
    selector: 'post-preview',
    templateUrl: './post-preview.component.html',
    styleUrls: ['./post-preview.component.scss'],
    host: {
      ['role']: 'link'
    }
})
export class PostPreviewComponent implements OnInit {

    @Input() url: string;
    @Input() image: string;
    @Input() title: string;
    @Input() description: string;

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2,
        private router: Router
    ) {}

    ngOnInit() {
        this.setBackgroundImage();
    }

    @HostListener('click')
    private navigate() {
        this.renderer.setAttribute(this.elementRef.nativeElement, 'href', this.url);
        this.router.navigateByUrl(this.url);
    }

    private setBackgroundImage() {
        if (!environment.production) {
            this.image = 'http://localhost:8000' + this.image;
        } 
        this.renderer.setStyle(this.elementRef.nativeElement, 'background-image', 'url(' + this.image + ')' );
    }


}