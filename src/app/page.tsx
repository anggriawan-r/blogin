"use client";

import Aside from "@/components/Aside";
import BlogList from "@/components/BlogList";
import Hero from "@/components/Hero";
import Link from "next/link";
import { getCategories } from "@/libs/getCategories";
import { getBlogs } from "@/libs/getBlogs";
import useSWR from "swr";
import CategorySlider from "@/components/CategorySlider";

export default function Home() {
  const { data: categories, isLoading: loadingCategories } = useSWR(
    `/api/category?limit=12`,
    getCategories,
  );
  const { data, isLoading: loadingBlog } = useSWR(
    `/api/blog?limit=12`,
    getBlogs,
  );

  return (
    <main className="mx-auto">
      <Hero />
      <section className="container mx-auto mt-12 px-4 sm:px-6 md:px-12">
        {categories && <CategorySlider categories={categories} />}

        <div className="mt-12 max-w-7xl lg:flex lg:gap-12">
          <div className="flex w-full flex-col items-center lg:w-2/3">
            {data && <BlogList posts={data.posts} />}
            <Link
              href="/blog"
              className="my-12 w-[240px] rounded-lg border border-gray-900 bg-white py-2 text-center font-semibold text-gray-900 transition hover:bg-gray-900 hover:text-white"
            >
              Load more
            </Link>
          </div>
          {categories && <Aside categories={categories} />}
        </div>
      </section>
    </main>
  );
}
