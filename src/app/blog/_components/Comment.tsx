import { getDateFromDB } from "@/libs/getDateFromDB";
import { CommentType } from "@/libs/types";
import Image from "next/image";
import React from "react";

export default function Comment({
  data,
  isLast,
}: {
  data: CommentType;
  isLast?: boolean;
}) {
  const { day, month, year } = getDateFromDB(data);

  return (
    <>
      <div className="flex gap-4">
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full md:h-12 md:w-12">
          <Image
            src={data.user.image}
            alt="user image"
            fill
            className="absolute object-cover"
          />
        </div>
        <div className="flex flex-col border-b-gray-200">
          <div className="flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-2">
            <p className="text-sm font-medium leading-tight">
              {data.user.name}
            </p>
            <p className="softTextColor text-xs leading-tight">
              {month} {day}, {year}
            </p>
          </div>
          <p className="my-2 text-sm">{data.body}</p>
        </div>
      </div>
      {!isLast && <hr className="h-1 w-full" />}
    </>
  );
}
