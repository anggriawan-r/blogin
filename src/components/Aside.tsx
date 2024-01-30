import Link from "next/link";
import React from "react";

type Props = {
  id: string;
  slug: string;
  title: string;
  img: string | null;
}[];

export default function Aside({ categories }: { categories: Props }) {
  return (
    <aside className="hidden gap-4 lg:flex lg:w-1/3 lg:flex-col">
      <div className="flex flex-col gap-4 lg:sticky lg:top-20">
        <div className="text-xl font-semibold">Category</div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="rounded-lg bg-gray-200 px-3 py-1 text-sm transition hover:bg-orange-500/20 hover:text-orange-600"
            >
              {category.title}
            </Link>
          ))}
        </div>
        <Link
          href="/category"
          className="text-sm text-gray-900 transition hover:text-orange-600"
        >
          See more categories
        </Link>
      </div>
    </aside>
  );
}
