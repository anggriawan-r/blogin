import { getDateFromDB } from "@/libs/getDateFromDB";
import { CommentType } from "@/libs/types";
import Image from "next/image";
import React from "react";

export default function Comment({ data }: { data: CommentType }) {
  const { day, month, year } = getDateFromDB(data);

  return (
    <div className="flex gap-4">
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full">
        <Image
          src={data.user.image}
          alt="user image"
          fill
          className="absolute object-cover"
        />
      </div>
      <div className="flex flex-col">
        <div className="flex gap-2">
          <p className="font-bold">{data.user.name}</p>
          <p className="softTextColor">
            {month} {day}, {year}
          </p>
        </div>
        <p className="my-1">{data.body}</p>
      </div>
    </div>
  );
}
