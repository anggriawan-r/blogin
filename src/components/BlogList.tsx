import React from "react";
import Blog from "./Blog";
import { BlogType } from "@/libs/types";

type Props = {
  posts: BlogType[];
};

export default function BlogList({ posts }: Props) {
  return (
    <section className="flex w-full flex-col items-center justify-center gap-8">
      {posts.map((data) => (
        <Blog key={data.id} content={data} />
      ))}
    </section>
  );
}
