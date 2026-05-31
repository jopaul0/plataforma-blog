export interface PostAuthor {
  id: string;
  name: string;
  username: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: 'DRAFT' | 'PUBLISHED';
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  authorId: string;
  author: PostAuthor;
  likesCount: number;
  likedByMe?: boolean;
}

export default interface PostCardProps {
  post: Post;
}