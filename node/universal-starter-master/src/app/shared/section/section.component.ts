import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'shared-section',
  templateUrl: './section.component.html',
  styleUrls: ['section.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SectionComponent implements OnInit {

  @Input() backgroundImage: string;
  @Input() repeatBackground = false;
  @Input() heading = '';
  @Input() subheading = '';
  @Input() buttonText = '';
  imageDirPath = '/assets/images/';

  constructor() { }

  ngOnInit() {
  }

  setBackground() {
    return {
      'background-size': this.repeatBackground ? 'repeat' : 'cover',
      'background-image': 'url("' + this.getImagePath() + '")'
    }
  }

  getImagePath() {
    return this.imageDirPath + this.backgroundImage;
  }

}
