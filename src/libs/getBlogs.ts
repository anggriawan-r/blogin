import { Fetcher } from "swr";

export type User = {
  id: string;
  name: string;
  email: string;
  emailVerified: string;
  image: string;
};

export type Category = {
  id: string;
  slug: string;
  title: string;
  img: string;
};

export type Blogs = {
  id: string;
  createdAt: string;
  slug: string;
  title: string;
  abstract: string;
  body: string;
  image: string;
  views: number;
  userEmail: string;
  categoryId: string;
  user: User;
  category: Category;
};

export type BlogsProps = {
  posts: Blogs[];
  count: number;
};

export const getBlogs: Fetcher<BlogsProps, string> = async (url: string) => {
  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data!");
  }

  const data = await res.json();
  return data;
};
