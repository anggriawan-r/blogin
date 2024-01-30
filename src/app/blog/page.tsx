import Aside from "@/components/Aside";
import React from "react";
import { getCategories } from "@/libs/getCategories";
import BlogListClient from "./_components/BlogListClient";
import { URLSearchParams } from "url";
import dynamic from "next/dynamic";
import Sorter from "@/components/Sorter";
const CategorySlider = dynamic(() => import("@/components/CategorySlider"), {
  ssr: false,
});
export const runtime = "edge";

type Props = {
  searchParams: string;
};

export default async function BlogPage({ searchParams }: Props) {
  const categories = await getCategories(10);
  const pageParams = new URLSearchParams(searchParams).get("page");
  const page = parseInt(pageParams || "1");
  const sortParams = new URLSearchParams(searchParams).get("sort");

  const sortFn = (sort: string | null) => {
    if (sort === "asc") return "asc";
    if (sort === "desc") return "desc";

    return "desc";
  };

  const sort = sortFn(sortParams);

  return (
    <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-8 px-4 sm:px-6 md:px-12 lg:gap-12">
      {categories && <CategorySlider categories={categories} />}
      <Sorter />
      <div className="flex gap-12">
        <BlogListClient page={page} limit={2} sort={sort} />
        <Aside categories={categories} />
      </div>
    </div>
  );
}
