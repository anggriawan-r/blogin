"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useMemo, useState } from "react";

type Props = {
  limit: number;
  count: number;
  page: number;
  mutate: () => void;
};

const getPageArray = (count: number, limit: number) => {
  const pageLength = Math.ceil(count / limit);
  const pageNumber = new Array(pageLength);

  for (let i = 1; i <= pageLength; i++) {
    pageNumber.push(i);
  }
  return pageNumber;
};

export default function Pagination({ limit, count, page, mutate }: Props) {
  const router = useRouter();
  const params = useSearchParams();

  const pageNumber = useMemo(() => getPageArray(count, limit), [count, limit]);

  const hasPrev = limit * (page - 1) > 0;
  const hasNext = limit * (page - 1) + limit < count;

  const handlePrev = () => {
    const searchParams = new URLSearchParams(params);
    searchParams.set("page", (page - 1).toString());
    router.push(`/blog?${searchParams.toString()}`);
    mutate();
  };

  const handleNext = () => {
    const searchParams = new URLSearchParams(params);
    searchParams.set("page", (page + 1).toString());
    router.push(`/blog?${searchParams.toString()}`);
    mutate();
  };

  const handlePageNumber = (data: number) => {
    const searchParams = new URLSearchParams(params);
    searchParams.set("page", data.toString());
    router.push(`/blog?${searchParams.toString()}`);
    mutate();
  };

  return (
    <div className="flex h-10 w-full items-center justify-between gap-2">
      <button
        disabled={!hasPrev}
        onClick={handlePrev}
        className="group flex h-full w-16 items-center justify-center rounded-md bg-gray-900 text-sm text-white transition hover:scale-105  active:scale-90 disabled:bg-gray-200 disabled:hover:scale-100"
      >
        <ArrowLeft className="transition group-hover:-translate-x-2 group-disabled:translate-x-0" />
      </button>
      <div className="flex h-full gap-2">
        {pageNumber.map((data) => (
          <button
            key={data}
            disabled={page === data}
            onClick={() => handlePageNumber(data)}
            className="flex h-full w-12 items-center justify-center rounded-md border border-gray-900 bg-white text-sm text-gray-900 transition hover:bg-gray-900 hover:text-white active:scale-75 disabled:bg-gray-900 disabled:text-white"
          >
            {data}
          </button>
        ))}
      </div>
      <button
        disabled={!hasNext}
        onClick={handleNext}
        className="group flex h-full w-16 items-center justify-center rounded-md bg-gray-900 text-sm text-white transition hover:scale-105 active:scale-90  disabled:bg-gray-200 disabled:hover:scale-100"
      >
        <ArrowRight className="transition group-hover:translate-x-2 group-disabled:translate-x-0" />
      </button>
    </div>
  );
}
