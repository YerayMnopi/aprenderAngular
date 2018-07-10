import { ResponsiveImage } from './responsive-image';

export interface PostPreview {
    id: number;
    image: {thumbnail: string};
    title: string;
    description: string;
    slug: string;
}

export interface Post extends PostPreview {
    image: ResponsiveImage;
    body: {body: PostBodyElement[]};
}

export interface PostBodyElement {
    type: string;
    heading: string;
    content: string[];
}
