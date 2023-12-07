import { getDateFromDB } from "@/libs/getDateFromDB";
import { CommentType } from "@/libs/types";
import Image from "next/image";
import React from "react";

export default function Comment({ data }: { data: CommentType }) {
  const { day, month, year } = getDateFromDB(data);

  return (
    <div className="flex gap-4">
      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full md:h-12 md:w-12">
        <Image
          src={data.user.image}
          alt="user image"
          fill
          className="absolute object-cover"
        />
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col items-start gap-1 sm:flex-row sm:gap-2">
          <p className="text-sm font-semibold leading-tight sm:text-base">
            {data.user.name}
          </p>
          <p className="softTextColor text-xs leading-tight sm:text-base">
            {month} {day}, {year}
          </p>
        </div>
        <p className="my-1 text-sm sm:text-base">{data.body}</p>
      </div>
    </div>
  );
}
