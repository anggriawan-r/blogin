import React from "react";
import Blog from "./Blog";
import { BlogListType } from "@/utils/types";

async function getData() {
  const res = await fetch("http://localhost:3000/api/blog", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function BlogList() {
  const data: BlogListType[] = await getData();

  return (
    <section
      id="blog"
      className="container mb-20 grid scroll-mt-36 grid-cols-1 gap-x-12 gap-y-10 px-4 sm:grid-cols-2 md:grid-cols-3"
    >
      {data && data.map((data, index) => <Blog key={index} content={data} />)}
    </section>
  );
}
