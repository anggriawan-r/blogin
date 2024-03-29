"use client";

import { deleteImage } from "@/libs/deleteImage";
import { getDateFromDB } from "@/libs/getDateFromDB";
import { BlogType } from "@/libs/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { KeyedMutator } from "swr";

export default function Blog({
  content,
  name,
  handleModal,
}: {
  content: BlogType;
  name: string;
  handleModal: () => void;
}) {
  const { day, month, year } = getDateFromDB(content);

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
        <div className="absolute right-2 top-2 z-10 flex w-max flex-col gap-2">
          <Link href={`/blog/${content.slug}/edit`}>
            <button className="w-full rounded-md bg-black/40 px-2 py-2 text-xs text-white transition hover:bg-black md:text-sm">
              Edit
            </button>
          </Link>

          <button
            onClick={handleModal}
            className="w-full rounded-md bg-red-500/50 px-2 py-2 text-xs text-white transition hover:bg-red-500 md:text-sm"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="prose prose-sm w-full lg:prose-base prose-headings:my-2 prose-p:m-0">
        <p className="softTextColor text-sm leading-normal">{`${name} \u2027 ${month} ${day}, ${year}`}</p>
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
