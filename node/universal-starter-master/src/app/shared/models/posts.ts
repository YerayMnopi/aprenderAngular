import { ResponsiveImage } from './responsive-image';

export class Post {
    image: ResponsiveImage;
    title: string;
    description: string;
    slug: string;
    body: {body: PostBodyElement[]};
}

export class PostBodyElement {
    type: string;
    heading: string;
    content: string[] | string;
}