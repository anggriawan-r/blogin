import React from "react";
import Blog from "./Blog";
import { getBlogs } from "@/libs/getBlogs";
import { BlogType } from "@/libs/types";

export default async function BlogList() {
  const data: BlogType[] = await getBlogs();

  return (
    <section
      id="blog"
      className="container flex flex-col items-center justify-center gap-16 px-4"
    >
      <div className="flex flex-col gap-12">
        {data.map((data) => (
          <Blog key={data.id} content={data} />
        ))}
      </div>
    </section>
  );
}
