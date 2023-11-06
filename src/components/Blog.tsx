import { dataType } from "@/utils/types";
import Image from "next/image";
import React from "react";

export default function Blog({ content }: { content: dataType }) {
  return (
    <div className="flex h-max flex-col gap-2">
      <div className="relative block h-[14rem] w-full">
        <Image
          src="https://images.pexels.com/photos/161275/santorini-travel-holidays-vacation-161275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Hero Image"
          quality={90}
          fill
          className="rounded-lg object-cover"
        />
      </div>

      <div className="flex w-full flex-col gap-1">
        <p className="softTextColor">{"John Doe \u2027 1 Nov 2023"}</p>
        <h1 className="text-lg font-bold sm:text-xl">{content.title}</h1>
        <p className="line-clamp-3 text-base">{content.body}</p>
      </div>
    </div>
  );
}
