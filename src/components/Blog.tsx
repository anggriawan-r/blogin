import { BlogListType } from "@/utils/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Blog({ content }: { content: BlogListType }) {
  const date = new Date(content.createdAt);
  const month = new Date(content.createdAt).toLocaleString("en-US", {
    month: "short",
  });

  const day = date.getDate();
  const year = date.getFullYear();

  return (
    <div className="flex h-max flex-col gap-4">
      {content.image ? (
        <Link href={`/blog/${content.slug}`}>
          <div className="relative block h-[12rem] w-full">
            <Image
              src={content.image}
              alt="Hero Image"
              quality={90}
              fill
              className="rounded-lg object-cover"
            />
          </div>
        </Link>
      ) : (
        <Link href={`/blog/${content.slug}`}>
          <div className="relative block h-[12rem] w-full">
            <Image
              src="https://images.pexels.com/photos/161275/santorini-travel-holidays-vacation-161275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Hero Image"
              quality={90}
              fill
              className="rounded-lg object-cover"
            />
          </div>
        </Link>
      )}

      <div className="prose prose-sm w-full sm:prose-base prose-headings:my-2 prose-p:m-0">
        <p className="softTextColor leading-normal">{`${content.user.name} \u2027 ${month} ${day}, ${year}`}</p>
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
