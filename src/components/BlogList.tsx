import React from "react";
import Blog from "./Blog";
import { dataType } from "@/utils/types";

async function getData() {
  const res = await fetch("https://dummyjson.com/posts?limit=6");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data.posts;
}

export default async function BlogList() {
  const data: dataType[] = await getData();

  return (
    <section
      id="blog"
      className="container grid scroll-mt-36 grid-cols-1 gap-x-6 gap-y-10 px-4 sm:grid-cols-2 md:grid-cols-3"
    >
      {data && data.map((item, index) => <Blog key={index} content={item} />)}
    </section>
  );
}
