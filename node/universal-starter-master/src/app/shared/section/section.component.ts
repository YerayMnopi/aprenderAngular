import { Component, OnChanges, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'shared-section',
  templateUrl: './section.component.html',
  styleUrls: ['section.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SectionComponent implements OnChanges {

  @Input() backgroundImage: string;
  @Input() repeatBackground = false;
  @Input() heading = '';
  sectionStyle = {};
  @Input() subheading = '';
  @Input() buttonText = '';
  @Input() external = true;
  imageDirPath = '/assets/images/';

  constructor() { }

  ngOnChanges() {
    this.setBackground();
  }

  setBackground() {
    this.sectionStyle =  {
      'background-size': this.repeatBackground ? 'repeat' : 'cover',
      'background-image': 'url("' + this.getImagePath() + '")'
    }
  }

  getImagePath() {
    return this.external ? this.backgroundImage : this.imageDirPath + this.backgroundImage;
  }

}
