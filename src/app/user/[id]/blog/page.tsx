"use client";

import Blog from "@/components/Blog";
import { getBlogs } from "@/libs/getBlogs";
import React from "react";
import useSWR from "swr";

export default function UserBlog({ params }: { params: { id: string } }) {
  const { data, isLoading: loadingBlog } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/blog?id=${params.id}`,
    getBlogs,
  );

  return (
    <section className="container my-24 flex flex-col gap-16">
      {data && (
        <h1 className="px-4 text-center text-xl font-bold sm:text-2xl md:text-3xl">
          {data.posts[0].user.name}&apos;s Blogs
        </h1>
      )}
      {data && (
        <div className="grid grid-cols-1 gap-x-6 gap-y-16 px-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-x-12">
          {data.posts.map((d) => (
            <Blog key={d.id} content={d} />
          ))}
        </div>
      )}
    </section>
  );
}
