import { BlogListType } from "@/utils/types";
import Image from "next/image";
import React from "react";

export default function Blog({ content }: { content: BlogListType }) {
  return (
    <div className="flex h-max flex-col gap-4">
      {content.image && (
        <div className="relative block h-[12rem] w-full">
          <Image
            src="https://images.pexels.com/photos/161275/santorini-travel-holidays-vacation-161275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Hero Image"
            quality={90}
            fill
            className="rounded-lg object-cover"
          />
        </div>
      )}

      <div className="flex w-full flex-col gap-3">
        <p className="softTextColor">{`${content.userEmail} \u2027 Nov 1, 2023`}</p>
        <h1 className="line-clamp-3 break-words text-lg font-bold sm:text-2xl">
          {content.title}
        </h1>
        <p className="softTextColor text-base">{content.abstract}</p>
      </div>
    </div>
  );
}
