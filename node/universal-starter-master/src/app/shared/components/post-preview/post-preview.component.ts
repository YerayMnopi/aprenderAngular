import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'post-preview',
    templateUrl: './post-preview.component.html',
    styleUrls: ['./post-preview.component.scss']
})
export class PostPreviewComponent {

    @Input() url: string;
    @Input() image: string;
    @Input() title: string;
    @Input() description: string;

    constructor(
        private router: Router
    ) {}

    navigate() {
        this.router.navigateByUrl(this.url);
    }

}