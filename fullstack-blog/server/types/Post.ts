export interface Post {
    title: string;
    text: string;
    imageUrl?: string;
    tags: string[];
    author: unknown;
}

export interface PostDocument {
    _doc: Post;
    _id: unknown;
}
