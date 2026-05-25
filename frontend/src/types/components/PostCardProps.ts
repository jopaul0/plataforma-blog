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
  createdAt: string;
  author: PostAuthor;
}

export default interface PostCardProps {
  post: Post;
}