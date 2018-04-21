import { Component, Input } from '@angular/core';
import { environment } from '../../../environments/environment'

@Component({
  selector: 'shared-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent {

  apiUrl = environment.apiUrl + 'media/images/';

  thumbnailSufix = '-thumbnail';
  type = '.jpg';

  @Input() slug: string;
    
  constructor() {}

}