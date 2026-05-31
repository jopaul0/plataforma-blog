import { PostAuthor } from '../components/PostCardProps';

export interface Comment {
    id: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    authorId: string;
    postId: string;
    author: PostAuthor;
}

export interface PostCommentsResponse {
    comments: Comment[];
}