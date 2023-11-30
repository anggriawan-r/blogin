import React, { Suspense } from "react";
import Blog from "./Blog";
import { BlogListType } from "@/utils/types";
import Link from "next/link";

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
      className="container my-24 flex scroll-mt-24 flex-col items-center justify-center gap-16 px-4"
    >
      <h1 className="text-center text-3xl font-bold">Recent Blogs</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <div className="grid grid-cols-1 gap-x-6 gap-y-16 sm:grid-cols-2 md:grid-cols-3 lg:gap-x-12 ">
          {data.map((data) => (
            <Blog key={data.id} content={data} />
          ))}
        </div>
      </Suspense>
      <Link href="/blog">
        <button className="btn w-[240px] border border-gray-900 bg-white text-gray-900 transition hover:bg-gray-900 hover:text-white">
          Load more
        </button>
      </Link>
    </section>
  );
}
