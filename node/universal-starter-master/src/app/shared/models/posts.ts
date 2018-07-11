import { ResponsiveImage } from './responsive-image';
import { Category } from './category';

export interface PostPreview {
    id: number;
    image: {thumbnail: string};
    category: {slug: string};
    title: string;
    description: string;
    slug: string;
}

export interface Post extends PostPreview {
    image: ResponsiveImage;
    category: Category;
    body: {body: PostBodyElement[]};
}

export interface PostBodyElement {
    type: string;
    heading: string;
    content: string[];
}
