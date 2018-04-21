export class Post {
    image: ResponsiveImage;
    title: string;
    description: string;
    slug: string;
    body: {body: {}}
}

export class ResponsiveImage {
    url: string;
    created: string;
    updated: string;
    title: string;
    slug: string;
    type: string;
    author: string;
    caption: string;
    alt: string;
    width: number;
    height: number;
    image: string;
    thumbnail: string;
}