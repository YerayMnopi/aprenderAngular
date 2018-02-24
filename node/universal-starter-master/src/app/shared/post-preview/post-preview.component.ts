import { Component, Input } from '@angular/core';

@Component({
    selector: 'post-preview',
    templateUrl: './post-preview.component.html',
    styleUrls: ['./post-preview.component.scss']
})
export class PostPreviewComponent {

    @Input() image: string;
    @Input() title: string;
    @Input() description: string;

    constructor() {}

}