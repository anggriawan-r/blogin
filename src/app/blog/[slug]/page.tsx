import React from "react";
import parse from "html-react-parser";
import Image from "next/image";
import { getBlog } from "@/libs/getBlog";
import { BlogType } from "@/libs/types";
import Comments from "../_components/Comments";
import { getDateFromDB } from "@/libs/getDateFromDB";
import Head from "next/head";
import Link from "next/link";

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const data: BlogType = await getBlog(params.slug);
  const { day, month, year } = getDateFromDB(data);

  return (
    <>
      <Head>
        <title>{data.title}</title>
      </Head>
      <section className="container my-20 flex flex-col items-center justify-center gap-10 px-4 md:max-w-screen-md">
        <div className="flex w-full flex-col gap-4">
          <div className="relative h-[25vh] w-full sm:h-[40vh]">
            <Image
              src={data.image as string}
              alt="blog image"
              fill
              className="absolute rounded-lg object-cover"
            />
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
              <Link href={`/user/blog/${data.user.id}`}>
                <p className="text-sm text-gray-500 transition hover:text-orange-500">
                  {data.user.name}
                </p>
              </Link>
              <p className="text-sm text-gray-500">{`${month} ${day}, ${year}`}</p>
            </div>
          </div>
        </div>
        <article className="prose prose-sm w-full max-w-none sm:prose-base lg:prose-lg">
          <h1 className="">{parse(data.title)}</h1>
          <p>{data.abstract}</p>
          {parse(data.body)}
        </article>

        <Comments blogSlug={params.slug} />
      </section>
    </>
  );
}
