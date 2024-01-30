import BlogList from "@/components/BlogList";
import React from "react";
import Pagination from "./Pagination";
import { BlogType } from "@/libs/types";
import { getBlogs } from "@/libs/getBlogs";

type Props = {
  id?: string;
  limit: number;
  page: number;
  category?: string;
  sort?: "asc" | "desc";
};

export default async function BlogListClient({
  id,
  limit,
  page,
  category,
  sort,
}: Props) {
  const { posts, count }: { posts: BlogType[]; count: number } = await getBlogs(
    { id, limit, page, category, sort },
  );

  return (
    <div className="flex w-full flex-col items-center gap-8 lg:w-2/3">
      <BlogList posts={posts} />
      <Pagination limit={limit} count={count} page={page} />
    </div>
  );
}
