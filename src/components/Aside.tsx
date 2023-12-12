import prisma from "@/utils/connect";
import React from "react";

const getCategories = async () => {
  const res = await prisma.category.findMany();
  return res;
};

export default async function Aside() {
  const categories = await getCategories();

  return (
    <aside className="hidden w-1/3 flex-col gap-4 lg:flex">
      <div className="flex flex-col gap-4 lg:sticky lg:top-20">
        <div className="text-xl font-semibold">Category</div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <div
              key={category.id}
              className="rounded-lg bg-gray-200 px-3 py-1 text-sm"
            >
              {category.title}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
