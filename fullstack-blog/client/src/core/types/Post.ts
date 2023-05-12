import { User } from './User';

export interface Post {
    _id: string;
    title: string;
    createdAt: string;
    imageUrl: string;
    author: User;
    viewsCount: number;
    commentsCount: number;
    tags?: string[];
    children?: any;
    isFullPost?: boolean;
    isEditable?: boolean;
}
