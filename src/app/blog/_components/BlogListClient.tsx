"use client";

import BlogList from "@/components/BlogList";
import React from "react";
import Pagination from "./Pagination";
import { getBlogs } from "@/libs/getBlogs";
import useSWR from "swr";

type Props = {
  id?: string;
  limit: number;
  page: number;
  category?: string;
  sort?: "asc" | "desc";
};

export default function BlogListClient({
  id,
  limit,
  page,
  category,
  sort,
}: Props) {
  const params = new URLSearchParams();

  if (id) params.append("id", id);
  if (limit) params.append("limit", limit.toString());
  if (page) params.append("page", page.toString());
  if (category) params.append("category", category.toString());
  if (sort) params.append("sort", sort.toString());

  const { data, isLoading: loadingBlog } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/blog?${params}`,
    getBlogs,
  );

  return (
    <div className="flex w-full flex-col items-center gap-8 lg:w-2/3">
      {data && (
        <>
          <BlogList posts={data.posts} />
          <Pagination limit={limit} count={data.count} page={page} />
        </>
      )}
    </div>
  );
}
