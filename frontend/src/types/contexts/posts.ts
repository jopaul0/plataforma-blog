import { Post } from '../components/PostCardProps';
import { PaginatedPostsResponse } from '../api/posts';

export interface PostsContextData {
  homePostsData: PaginatedPostsResponse | null;
  userPosts: Post[] | null;
  loadingHome: boolean;
  loadingDashboard: boolean;
  fetchHomePosts: (page: number, perPage: number, forceRefresh?: boolean) => Promise<void>;
  fetchUserPosts: (forceRefresh?: boolean) => Promise<void>;
  invalidateUserPosts: () => void;
  invalidateHomePosts: () => void;
}