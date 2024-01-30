"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

type sortType = {
  name: string;
  order: "asc" | "desc";
};

const sortList: sortType[] = [
  { name: "Popularity", order: "asc" },
  { name: "Newest", order: "desc" },
  { name: "Oldest", order: "asc" },
];

export default function Sorter() {
  const router = useRouter();
  const params = useSearchParams();

  const handleSort = (data: "asc" | "desc") => {
    const searchParams = new URLSearchParams(params);
    searchParams.set("sort", data);
    router.push(`/blog?${searchParams.toString()}`);
  };

  return (
    <div className="flex items-center gap-3 self-start">
      <p>Sort by:</p>

      <ul className="flex gap-2">
        {sortList.map((data) => (
          <li key={data.name}>
            <input
              id={data.name}
              type="radio"
              name="sortBy"
              className="peer hidden"
              defaultChecked={data.name === "Newest"}
            />
            <label
              htmlFor={data.name}
              onClick={() => handleSort(data.order)}
              className="w-full cursor-pointer items-center justify-between rounded-lg border border-gray-200 bg-white px-3 py-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-600 peer-checked:border-orange-500 peer-checked:text-orange-500"
            >
              {data.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
