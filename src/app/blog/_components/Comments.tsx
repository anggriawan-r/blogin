"use client";

import { Send } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import Comment from "./Comment";
import useSWR from "swr";
import { getComments } from "../_libs/getComments";
import { CommentType } from "@/libs/types";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";

export default function Comments({ blogSlug }: { blogSlug: string }) {
  const { data: session, status } = useSession();

  const { data, isLoading, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}/api/comments?blogSlug=${blogSlug}`,
    getComments,
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm({
    defaultValues: {
      comment: "",
    },
  });

  const onSubmit = async (formData: { comment: string }) => {
    await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ formData, blogSlug }),
    });
    reset();
    mutate();
  };

  return (
    <section className="my-12 flex w-full flex-col gap-4">
      <h1 className="text-lg font-bold md:text-2xl">Comments</h1>
      {status === "authenticated" ? (
        <div className="flex gap-4">
          <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full md:h-12 md:w-12">
            <Image
              src={session.user?.image as string}
              alt="User image"
              fill
              className="absolute object-cover"
            />
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-2"
          >
            <textarea
              {...register("comment", { required: "Comment can not blank" })}
              id="comment"
              placeholder="Write a comment..."
              className="h-24 w-full resize-none rounded-lg border border-black/25 p-2 text-sm sm:p-4"
            />
            {errors.comment && isDirty && (
              <p className="-mt-6 ml-2 text-red-500">
                {errors.comment.message}
              </p>
            )}
            <button
              type="submit"
              className="group flex items-center justify-center gap-2 self-end rounded-md bg-gray-900 px-3 py-3 text-xs text-white/80 transition sm:px-4 sm:py-3 sm:text-sm"
            >
              Add comment
              <Send className="h-3 w-3 transition group-hover:-translate-y-[2px] group-hover:translate-x-[2px] sm:h-4 sm:w-4" />
            </button>
          </form>
        </div>
      ) : (
        <p className="text-center">
          <button
            onClick={() =>
              signIn(undefined, {
                callbackUrl: `http://localhost:3000/blog/${blogSlug}`,
              })
            }
            className="softTextColor font-bold underline"
          >
            Login
          </button>{" "}
          to write a comment
        </p>
      )}

      <section className="my-12 flex flex-col gap-4">
        {!isLoading &&
          data.map(
            (comment: CommentType, index: number, array: CommentType[]) => {
              return (
                <Comment
                  key={comment.id}
                  data={comment}
                  isLast={index + 1 === array.length}
                />
              );
            },
          )}
      </section>
    </section>
  );
}
