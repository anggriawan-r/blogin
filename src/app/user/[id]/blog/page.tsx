import Blog from "@/components/Blog";
import { getBlogs } from "@/libs/getBlogs";
import { BlogType } from "@/libs/types";
import React from "react";

export default async function UserBlog({ params }: { params: { id: string } }) {
  const data: BlogType[] = await getBlogs(12, 1, params.id);

  return (
    <section className="container my-24 flex flex-col gap-16">
      <h1 className="px-4 text-center text-xl font-bold sm:text-2xl md:text-3xl">
        {data[0].user.name}&apos;s Blogs
      </h1>
      <div className="grid grid-cols-1 gap-x-6 gap-y-16 px-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-x-12">
        {data.map((d) => (
          <Blog key={d.id} content={d} />
        ))}
      </div>
    </section>
  );
}
