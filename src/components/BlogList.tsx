import React from "react";
import Blog from "./Blog";
import { Blogs } from "@/libs/getBlogs";

export default function BlogList({ posts }: { posts: Blogs[] }) {
  return (
    <section className="flex w-full flex-col items-center justify-center gap-8">
      {posts.map((data) => (
        <Blog key={data.id} content={data} />
      ))}
    </section>
  );
}
