"use client";

import React from "react";
import TextareaAutosize from "react-textarea-autosize";
import TipTap from "@/components/tiptap/TipTap";
import { Controller, useForm } from "react-hook-form";

type InputType = {
  title: string;
  body: string;
};

export default function WritePage() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<InputType>();

  const onSubmit = (data: InputType) => {
    console.log(data);
  };

  return (
    <section className="container my-[64px] flex w-full flex-col items-center justify-center">
      <div className="my-12 flex w-full flex-col gap-8 self-start">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
          <TextareaAutosize
            {...register("title", { required: "Title is required" })}
            placeholder="Title..."
            maxRows={3}
            className="w-full resize-none overscroll-contain border-none p-2 text-5xl font-bold placeholder-gray-300 outline-none"
          />
          {errors.title && (
            <p className="-mt-6 text-red-500">{errors.title.message}</p>
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
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}
