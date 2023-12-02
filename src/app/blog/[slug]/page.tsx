import React, { Suspense } from "react";
import parse from "html-react-parser";
import { BlogListType } from "@/utils/types";
import Image from "next/image";
import { getBlog } from "../_lib/getBlog";
import BlogImageSkeleton from "../_components/BlogImageSkeleton";

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const data: BlogListType = await getBlog(params.slug);

  const date = new Date(data.createdAt);
  const month = new Date(data.createdAt).toLocaleString("en-US", {
    month: "short",
  });

  const day = date.getDate();
  const year = date.getFullYear();

  return (
    <section className="container my-20 flex flex-col items-center justify-center gap-10 px-4 md:max-w-screen-md">
      <div className="flex w-full flex-col gap-4">
        <div className="relative h-[25vh] w-full sm:h-[40vh]">
          <Suspense fallback={<BlogImageSkeleton />}>
            <Image
              src={data.image as string}
              alt="blog image"
              fill
              className="absolute rounded-lg object-cover"
            />
          </Suspense>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative h-10 w-10">
            {data.user.image && (
              <Image
                src={data.user.image}
                alt="user image"
                fill
                className="absolute rounded-full object-cover"
              />
            )}
          </div>
          <div>
            <p className="text-sm text-gray-500">{data.user.name}</p>
            <p className="text-sm text-gray-500">{`${month} ${day}, ${year}`}</p>
          </div>
        </div>
      </div>
      <div className="prose prose-sm w-full max-w-none sm:prose-base lg:prose-lg">
        <h1 className="">{parse(data.title)}</h1>
        <p>{data.abstract}</p>
        {parse(data.body)}
      </div>
    </section>
  );
}
