"use client";

import React, { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import TipTap from "@/components/tiptap/TipTap";
import { Controller, useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import parse from "html-react-parser";

type InputType = {
  title: string;
  abstract: string;
  body: string;
};

export default function WritePage() {
  const [data, setData] = useState<InputType>();
  const { status } = useSession();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<InputType>();

  const onSubmit = (data: InputType) => {
    console.log(data);
    setData(data);
  };

  if (status === "unauthenticated") {
    redirect("/login");
  }

  return (
    <section className="container my-[64px] flex w-full flex-col items-center justify-center lg:max-w-screen-lg">
      <div className="my-12 flex w-full flex-col gap-8 self-start">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
          <TextareaAutosize
            {...register("title", { required: "Title is required" })}
            placeholder="Title..."
            maxRows={4}
            className="w-full resize-none overscroll-contain border-none p-2 text-5xl font-bold placeholder-gray-300 outline-none"
          />
          {errors.title && (
            <p className="-mt-6 ml-2 text-red-500">{errors.title.message}</p>
          )}

          <TextareaAutosize
            {...register("abstract", { required: "Abstract is required" })}
            placeholder="Abstract..."
            maxRows={20}
            className="prose w-full max-w-none resize-none overscroll-contain border-none p-2 placeholder-gray-400 outline-none lg:prose-lg"
          />
          {errors.abstract && (
            <p className="-mt-6 ml-2 text-red-500">{errors.abstract.message}</p>
          )}

          <Controller
            render={({ field }) => (
              <TipTap onChange={field.onChange} body={field.value} />
            )}
            control={control}
            name="body"
            defaultValue=""
            rules={{ required: "Body article is required" }}
          />
          {errors.body && (
            <p className="-mt-6 text-red-500">{errors.body.message}</p>
          )}
          <button
            type="submit"
            className="btn w-max bg-gray-900 px-10 text-white"
          >
            Publish
          </button>
        </form>
      </div>

      {data && (
        <div className="prose prose-sm lg:prose-lg">{parse(data.body)}</div>
      )}
    </section>
  );
}
