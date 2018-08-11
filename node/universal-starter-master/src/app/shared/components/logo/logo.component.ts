import { Component, OnInit, Input, Renderer2, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'logo',
    templateUrl: './logo.component.html',
    styleUrls: ['./logo.component.scss'],
    host: {
        'href': '/',
        'role': 'logo'
    }
})
export class LogoComponent implements OnInit{

    @Input() color: string;

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2,
        private router: Router
    ) {}

    ngOnInit() {
        this.getColorClass();
    }

    getColorClass() {
        if (this.color) {
            this.renderer.addClass(
                this.elementRef.nativeElement,
                this.color
            );            
        }
    }

    @HostListener('click') goHome() {
        this.router.navigate(['']);
    }
}