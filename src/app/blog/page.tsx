import BlogList from "@/components/BlogList";
import React from "react";

export default async function BlogPage() {
  return (
    <section className="container mt-16 flex flex-col gap-16">
      <div className="my-12">
        <BlogList />
      </div>
    </section>
  );
}
