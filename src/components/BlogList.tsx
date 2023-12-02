import React from "react";
import Blog from "./Blog";
import Link from "next/link";
import { getData } from "@/app/_lib/getData";
import { BlogListType } from "@/utils/types";

export default async function BlogList() {
  const data = await getData();

  return (
    <section
      id="blog"
      className="container my-24 flex scroll-mt-24 flex-col items-center justify-center gap-16 px-4"
    >
      <h1 className="text-center text-3xl font-bold">Recent Blogs</h1>

      <div className="grid grid-cols-1 gap-x-6 gap-y-16 sm:grid-cols-2 md:grid-cols-3 lg:gap-x-12 ">
        {data.map((data: BlogListType) => (
          <Blog key={data.id} content={data} />
        ))}
      </div>

      <Link href="/blog">
        <button className="btn w-[240px] border border-gray-900 bg-white text-gray-900 transition hover:bg-gray-900 hover:text-white">
          Load more
        </button>
      </Link>
    </section>
  );
}
