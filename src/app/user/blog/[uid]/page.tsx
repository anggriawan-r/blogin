import Blog from "@/components/Blog";
import { getBlogs } from "@/libs/getBlogs";
import { BlogType } from "@/libs/types";
import React from "react";

export default async function UserBlog({
  params,
}: {
  params: { uid: string };
}) {
  const data: BlogType[] = await getBlogs(1, params.uid);

  return (
    <section className="container my-24 flex flex-col gap-16">
      <h1 className="text-center text-3xl font-bold">
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
