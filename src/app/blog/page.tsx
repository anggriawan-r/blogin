import React from "react";
import BlogList from "./_components/BlogList";

export default async function BlogPage() {
  return (
    <section className="container my-24 flex flex-col gap-16">
      <h1 className="text-center text-3xl font-bold">Explore Blogs</h1>
      <BlogList />
    </section>
  );
}
