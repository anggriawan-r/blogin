import { getCategories } from "@/libs/getCategories";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function CategoryPage() {
  const categories = await getCategories();

  return (
    <section className="my-12 flex flex-col items-center justify-center">
      <h1 className="mb-12 text-5xl font-medium">Categories</h1>
      <div className="container mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 sm:grid-cols-3 sm:px-6 md:grid-cols-4 md:px-12">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/category/${category.slug}`}
            className="group relative flex aspect-video items-center justify-center overflow-hidden rounded-md bg-black/70 text-sm font-semibold text-white transition duration-500 ease-out hover:bg-black/40 sm:text-2xl lg:px-20 lg:text-3xl"
          >
            {category.title}

            {category.img && (
              <Image
                src={category.img}
                alt="category image"
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="absolute -z-10 object-cover transition-transform duration-500 ease-out group-hover:scale-125"
              />
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
