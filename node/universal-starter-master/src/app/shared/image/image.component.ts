import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { environment } from '../../../environments/environment'

@Component({
  selector: 'shared-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageComponent {

  apiUrl = environment.apiUrl + 'media/images/';

  thumbnailSufix = '-thumbnail';
  type = '.jpg';

  sources = [
    {sufix: '-thumbnail', maxWidth: '400px'},
    {sufix: '-tablet', maxWidth: '700px'},
    {sufix: '-desktop', maxWidth: '1200px'},
  ];

  @Input() slug: string;
    
  constructor() {}

}