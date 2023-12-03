import React, { Suspense } from "react";
import Blog from "@/components/Blog";
import { BlogListType } from "@/utils/types";
import BlogSkeleton from "@/components/_skeleton/BlogSkeleton";
import { getBlogs } from "./_lib/getBlogs";

export default async function BlogPage() {
  const data = await getBlogs();

  return (
    <section className="container my-24 flex flex-col gap-16">
      <h1 className="text-center text-3xl font-bold">Explore Blogs</h1>
      <div className="grid grid-cols-1 gap-x-6 gap-y-16 px-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-x-12">
        <Suspense
          fallback={
            <>
              <BlogSkeleton />
              <BlogSkeleton />
              <BlogSkeleton />
            </>
          }
        >
          {data.map((d: BlogListType) => (
            <Blog key={d.id} content={d} />
          ))}
        </Suspense>
      </div>
    </section>
  );
}
