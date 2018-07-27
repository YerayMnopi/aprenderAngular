import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { environment } from '../../../../environments/environment'

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
    {sufix: '-tablet', maxWidth: '800px'},
    {sufix: '-desktop', maxWidth: '1400px'},
  ];

  @Input() slug: string;
  @Input() caption = "";
  @Input() alt = "";
    
  constructor() {}

}