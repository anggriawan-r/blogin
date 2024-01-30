"use client";

import Blog from "@/components/Blog";
import { getBlogs } from "@/libs/getBlogs";
import { BlogType } from "@/libs/types";
import React from "react";
import useSWR from "swr";

export default function BlogList() {
  const { data, isLoading: loadingBlog } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/blog?limit=12`,
    getBlogs,
  );

  return (
    <>
      <h1 className="text-center text-3xl font-bold">Explore Blogs</h1>
      <div className="grid grid-cols-1 gap-x-6 gap-y-16 px-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-x-12">
        {data && data.posts.map((d) => <Blog key={d.id} content={d} />)}
      </div>
    </>
  );
}
