import { BlogType } from "@/app/blog/_lib/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Blog({ content }: { content: BlogType }) {
  const date = new Date(content.createdAt);
  const month = new Date(content.createdAt).toLocaleString("en-US", {
    month: "short",
  });

  const day = date.getDate();
  const year = date.getFullYear();

  return (
    <div className="flex h-max flex-col gap-4">
      <div className="relative block h-[12rem] w-full overflow-hidden rounded-lg">
        <Link href={`/blog/${content.slug}`}>
          <Image
            src={content.image as string}
            alt="Hero Image"
            quality={90}
            fill
            className="absolute object-cover transition duration-500 ease-out hover:scale-110"
          />
        </Link>
      </div>

      <div className="prose prose-sm w-full sm:prose-base prose-headings:my-2 prose-p:m-0">
        <p className="softTextColor text-sm leading-normal">{`${content.user.name} \u2027 ${month} ${day}, ${year}`}</p>
        <Link href={`/blog/${content.slug}`} className="no-underline">
          <h2 className="line-clamp-3 break-words leading-tight transition hover:text-orange-600">
            {content.title}
          </h2>
        </Link>
        <p className="softTextColor">{content.abstract}</p>
      </div>
    </div>
  );
}
