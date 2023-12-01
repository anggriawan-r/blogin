import React from "react";

export default function BlogSkeleton() {
  return (
    <div className="flex h-max w-full flex-col gap-4">
      <div className="relative block h-[12rem] w-full animate-pulse rounded-lg bg-gray-300"></div>
      <div className="flex w-full flex-col gap-2">
        <p className="softTextColor h-5 w-3/4 animate-pulse rounded-md bg-gray-300"></p>
        <h2 className="my-2 h-10 w-full animate-pulse break-words rounded-lg bg-gray-300"></h2>
        <p className="softTextColor h-5 w-full animate-pulse rounded-md bg-gray-300"></p>
        <p className="softTextColor h-5 w-full animate-pulse rounded-md bg-gray-300"></p>
        <p className="softTextColor h-5 w-full animate-pulse rounded-md bg-gray-300"></p>
        <p className="softTextColor h-5 w-3/4 animate-pulse rounded-md bg-gray-300"></p>
      </div>
    </div>
  );
}
