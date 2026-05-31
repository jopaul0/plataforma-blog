import { Post } from '../components/PostCardProps';
import { PaginatedPostsResponse } from '../api/posts';

export interface PostsContextData {
  homePostsData: PaginatedPostsResponse | null;
  searchPostsData: PaginatedPostsResponse | null;
  userPosts: Post[] | null;
  loadingHome: boolean;
  loadingSearch: boolean;
  loadingDashboard: boolean;
  fetchHomePosts: (page: number, perPage: number, forceRefresh?: boolean) => Promise<void>;
  fetchSearchPosts: (page: number, perPage: number, search: string) => Promise<void>;
  fetchUserPosts: (forceRefresh?: boolean) => Promise<void>;
  invalidateUserPosts: () => void;
  invalidateHomePosts: () => void;
  invalidateSearchPosts: () => void;
}