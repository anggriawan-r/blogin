"use client";

import React from "react";
import Blog from "./_components/Blog";
import { BlogType } from "@/libs/types";
import BlogSkeleton from "../../components/skeleton/BlogSkeleton";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "./_libs/fetcher";

export default function MyBlog() {
  const { status } = useSession();

  if (status === "unauthenticated") {
    redirect("/login");
  }

  // const { data, isLoading, mutate } = useSWR("/api/myblog", fetcher);

  return (
    <section id="blog" className="container my-24 flex flex-col gap-16">
      <h1 className="text-center text-3xl font-bold">My Blog</h1>
      <div className="grid grid-cols-1 gap-x-6 gap-y-16 px-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-x-12">
        {/* {!isLoading ? (
          data.map((post: BlogType) => (
            <Blog
              key={post.id}
              content={post}
              name={post.user.name}
              mutate={mutate}
            />
          ))
        ) : (
          <>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </>
        )} */}
      </div>
    </section>
  );
}
