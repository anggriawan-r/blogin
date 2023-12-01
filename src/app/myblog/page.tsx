"use client";

import React from "react";
import Blog from "./_components/Blog";
import { BlogListType } from "@/utils/types";
import BlogSkeleton from "../../components/_skeleton/BlogSkeleton";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import useSWR from "swr";

async function fetcher(url: string) {
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    const error = new Error(data.message);
    throw error;
  }

  return data;
}

export default function MyBlog() {
  const { status } = useSession();

  if (status === "unauthenticated") {
    redirect("/login");
  }

  const { data, isLoading } = useSWR("/api/myblog", fetcher);

  return (
    <section id="blog" className="container my-32 flex flex-col gap-16">
      <h1 className="text-center text-3xl font-bold">My Blogs</h1>
      <div className="grid grid-cols-1 gap-x-6 gap-y-16 px-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-x-12">
        {!isLoading && status !== "loading" ? (
          data.Post.map((post: BlogListType) => (
            <Blog key={post.id} content={post} name={data.name} />
          ))
        ) : (
          <>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </>
        )}
      </div>
    </section>
  );
}
