export type BlogType = {
  id: string;
  createdAt: string;
  slug: string;
  title: string;
  abstract: string;
  body: string;
  image?: string;
  views: number;
  userEmail: string;
  comments?: string[];
  user: {
    id: string;
    name: string;
    email: string;
    emailVerfied?: string;
    image?: string;
  };
};

export type EditBlogType = {
  title: string;
  abstract: string;
  body: string;
  image?: string;
  slug: string;
};

export type CommentType = {
  id: string;
  createdAt: string;
  body: string;
  userEmail: string;
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified?: string;
    image: string;
  };
};
