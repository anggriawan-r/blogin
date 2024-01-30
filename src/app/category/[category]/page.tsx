import BlogList from "@/components/BlogList";
import { getBlogs } from "@/libs/getBlogs";
import React from "react";

type Props = {
  category: string;
};

export default async function BlogCategory({ params }: { params: Props }) {
  const { category } = params;
  const cat = category.charAt(0).toUpperCase() + category.slice(1);
  const { posts } = await getBlogs({ category: category });

  return (
    <div className="mx-auto my-12 flex max-w-7xl flex-col items-center justify-center px-4 sm:px-6 md:px-12">
      <h1 className="mb-20 text-5xl font-medium">{cat}</h1>
      <BlogList posts={posts} />
    </div>
  );
}
