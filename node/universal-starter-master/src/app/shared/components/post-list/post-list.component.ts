import { Component, Input } from '@angular/core';

// Models
import { PostPreview } from '../../models/posts';

@Component({
  selector: 'shared-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss'],
  host: {
    'role': 'navigation'
  }
})
export class PostListComponent {

  @Input() posts: PostPreview[];

  @Input() urlPrefix = '/articulos';

  constructor() {}
}