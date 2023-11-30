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
  comments: string[];
  user: {
    id: string;
    name: string;
    email: string;
    emailVerfied?: string;
    image?: string;
  };
};
