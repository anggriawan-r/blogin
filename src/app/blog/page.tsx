import React, { Suspense } from "react";
import Blog from "@/components/Blog";
import { BlogListType } from "@/utils/types";
import BlogSkeleton from "./_skeleton/BlogSkeleton";

async function Blogs() {
  const res = await fetch("http://localhost:3000/api/blog", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  return (
    <>
      {data.map((data: BlogListType) => (
        <Blog key={data.id} content={data} />
      ))}
    </>
  );
}

export default async function BlogPage() {
  return (
    <Suspense fallback={<BlogSkeleton />}>
      <section
        id="blog"
        className="container my-20 grid scroll-mt-36 grid-cols-1 gap-x-6 gap-y-16 px-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-x-12"
      >
        <Blogs />
      </section>
    </Suspense>
  );
}
