import { Component, Input } from '@angular/core';

@Component({
    selector: 'logo',
    templateUrl: './logo.component.html',
    styleUrls: ['./logo.component.scss']
})
export class LogoComponent {

    @Input() color: string;

    constructor() {}

    getColorClass() {
        return this.color ? 'logo__container--inverse': '';
    }

}