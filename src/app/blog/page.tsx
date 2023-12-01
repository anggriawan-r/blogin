import React from "react";
import Blog from "@/components/Blog";
import BlogSkeleton from "../../components/_skeleton/BlogSkeleton";

export default async function BlogPage() {
  return (
    <section
      id="blog"
      className="container my-20 grid scroll-mt-36 grid-cols-1 gap-x-6 gap-y-16 px-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-x-12"
    >
      <BlogSkeleton />
      <BlogSkeleton />
      <BlogSkeleton />
    </section>
  );
}
