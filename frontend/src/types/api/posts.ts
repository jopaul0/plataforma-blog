import { Post } from '../components/PostCardProps';

export interface PaginatedPostsResponse {
    meta: {
        totalItems: number;
        itemCount: number;
        itemsPerPage: number;
        totalPages: number;
        currentPage: number;
    };
    posts: Post[];
}