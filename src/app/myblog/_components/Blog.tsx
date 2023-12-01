import { BlogListType } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Blog({
  content,
  name,
}: {
  content: BlogListType;
  name: string;
}) {
  const date = new Date(content.createdAt);
  const month = new Date(content.createdAt).toLocaleString("en-US", {
    month: "short",
  });

  const day = date.getDate();
  const year = date.getFullYear();

  return (
    <div className="flex h-max flex-col gap-4">
      <Link href={`/blog/${content.slug}`}>
        <div className="relative block h-[12rem] w-full">
          <Image
            src={content.image as string}
            alt="Hero Image"
            quality={90}
            fill
            className="rounded-lg object-cover"
          />
          <Link href={`/edit/${content.slug}`}>
            <button className="absolute right-2 top-2 rounded-md bg-black/40 px-4 py-2 text-white hover:bg-black">
              Edit
            </button>
          </Link>
        </div>
      </Link>

      <div className="prose prose-sm w-full sm:prose-base prose-headings:my-2 prose-p:m-0">
        <p className="softTextColor leading-normal">{`${name} \u2027 ${month} ${day}, ${year}`}</p>
        <Link href={`/blog/${content.slug}`} className="no-underline">
          <h2 className="line-clamp-3 break-words leading-tight">
            {content.title}
          </h2>
        </Link>
        <p className="softTextColor">{content.abstract}</p>
      </div>
    </div>
  );
}
