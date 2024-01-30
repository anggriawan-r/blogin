"use client";

import Aside from "@/components/Aside";
import React from "react";
import { getCategories } from "@/libs/getCategories";
import BlogListClient from "./_components/BlogListClient";
import { URLSearchParams } from "url";
import dynamic from "next/dynamic";
import Sorter from "@/components/Sorter";
import useSWR from "swr";
const CategorySlider = dynamic(() => import("@/components/CategorySlider"), {
  ssr: false,
});

type Props = {
  searchParams: string;
};

export default function BlogPage({ searchParams }: Props) {
  const pageParams = new URLSearchParams(searchParams).get("page");
  const page = parseInt(pageParams || "1");
  const sortParams = new URLSearchParams(searchParams).get("sort");

  const { data: categories, isLoading: loadingCategories } = useSWR(
    `/api/category?limit=10`,
    getCategories,
  );

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
        {categories && <Aside categories={categories} />}
      </div>
    </div>
  );
}
