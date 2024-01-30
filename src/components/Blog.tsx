import { getDateFromDB } from "@/libs/getDateFromDB";
import { BlogType } from "@/libs/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Blog({ content }: { content: BlogType }) {
  const { day, month, year } = getDateFromDB(content);

  return (
    <div className="flex h-max w-full items-start gap-4">
      <div className="relative h-24 w-1/3 shrink grow-0 overflow-hidden rounded-lg sm:h-36">
        <Link href={`/blog/${content.slug}`}>
          <Image
            src={content.image as string}
            alt="Hero Image"
            fill
            className="absolute object-cover transition duration-500 ease-out hover:scale-110"
          />
        </Link>
      </div>

      <div className="prose prose-sm w-2/3 shrink-[1] lg:prose-base prose-headings:my-1 prose-headings:font-bold prose-p:my-2">
        <div className="not-prose mb-2 flex items-center gap-2">
          <div className="relative h-5 w-5 overflow-hidden rounded-full">
            <Link href={`/user/${content.user.id}/blog`}>
              <Image
                src={content.user.image as string}
                alt="User image"
                fill
                sizes="(min-width: 1024px) 33vw, 25vw"
                className="absolute object-cover"
              />
            </Link>
          </div>
          <p className="softTextColor text-xs leading-normal sm:text-sm">
            <Link
              href={`/user/${content.user.id}/blog`}
              className="softTextColor no-underline transition hover:text-orange-600"
            >
              {content.user.name}
            </Link>
          </p>
        </div>
        <Link href={`/blog/${content.slug}`} className="no-underline">
          <h3 className="line-clamp-2 overflow-ellipsis text-sm leading-tight transition hover:text-orange-600 sm:text-xl">
            {content.title}
          </h3>
        </Link>
        <p className="softTextColor hidden overflow-ellipsis text-sm leading-tight sm:line-clamp-2 sm:text-sm">
          {content.abstract}
        </p>
        <div className="flex items-center gap-4">
          <p className="softTextColor text-xs sm:text-sm">
            {day} {month}, {year}
          </p>
          <Link
            href={`/category/${content.Category.slug}`}
            className="not-prose rounded-md bg-gray-200 px-2 py-1 text-xs transition hover:bg-orange-500/20 hover:text-orange-600"
          >
            {content.Category.title}
          </Link>
        </div>
      </div>
    </div>
  );
}
