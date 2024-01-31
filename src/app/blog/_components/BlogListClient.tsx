"use client";

import BlogList from "@/components/BlogList";
import React from "react";
import Pagination from "./Pagination";
import { getBlogs } from "@/libs/getBlogs";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";

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
  const params = useSearchParams();
  const searchParams = new URLSearchParams(params);

  if (id) searchParams.append("id", id);
  if (limit) searchParams.append("limit", limit.toString());
  if (page) searchParams.append("page", page.toString());
  if (category) searchParams.append("category", category.toString());
  if (sort) searchParams.append("sort", sort.toString());

  const { data, isLoading: loadingBlog } = useSWR(
    `/api/blog?${searchParams}`,
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
