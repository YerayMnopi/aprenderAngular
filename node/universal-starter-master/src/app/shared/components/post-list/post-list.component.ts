import { Component, Input } from '@angular/core';

// Models
import { Post } from '../../models/posts';

@Component({
  selector: 'shared-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent {

  @Input() posts: Post[];

  @Input() urlPrefix = '/articulos';

  constructor() {}
}