export type BlogListType = {
  id: string;
  createdAt: string;
  slug: string;
  title: string;
  abstract: string;
  body: string;
  image?: string;
  views: number;
  userEmail: string;
  user: string;
  comments: string[];
};
