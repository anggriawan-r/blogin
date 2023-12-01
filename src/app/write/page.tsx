"use client";

import React, { ChangeEvent, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import TipTap from "@/components/tiptap/TipTap";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ImageIcon } from "lucide-react";
import { Toaster } from "react-hot-toast";
import Image from "next/image";
import slugify from "slugify";
import { uploadBlog } from "./_lib/uploadBlog";

type InputType = {
  title: string;
  abstract: string;
  body: string;
  image?: string;
};

export default function WritePage() {
  const [file, setFile] = useState<File>();
  const [media, setMedia] = useState<string>("");
  const [slug, setSlug] = useState<string>();
  const [isImageAdded, setIsImageAdded] = useState<boolean>(false);
  const { status } = useSession();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm<InputType>({
    defaultValues: {
      title: "",
      abstract: "",
      body: "",
    },
  });

  if (status === "unauthenticated") {
    redirect("/login");
  }

  const updateImageDisplay = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files?.length === 0) {
      setIsImageAdded(false);
    } else if (e.target.files !== (null && undefined)) {
      setFile(e.target.files[0]);
      setMedia(URL.createObjectURL(e.target.files[0]));
      setIsImageAdded(true);
    }
  };

  const onSubmit: SubmitHandler<InputType> = async (data) => {
    await uploadBlog(file, setSlug, {
      body: data.body,
      title: data.title,
      abstract: data.abstract,
      slug: slugify(data.title).toLowerCase(),
    });
  };

  if (slug !== undefined) {
    redirect(`/blog/${slug}`);
  }

  return (
    <section className="container my-[64px] flex w-full flex-col items-center justify-center px-4 lg:max-w-screen-lg">
      <Toaster />

      <div className="my-12 flex w-full flex-col gap-8 self-start">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
          <input
            type="file"
            accept=".jpg, .jpeg, .png, .webp"
            {...register("image", { required: "Image is required" })}
            id="image"
            onChange={(e) => updateImageDisplay(e)}
            className="hidden"
          />
          {!isImageAdded ? (
            <div className="flex w-full flex-col items-center justify-center">
              <label
                htmlFor="image"
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-black/10 py-2 text-gray-700 transition-all hover:bg-black/20 md:py-3"
              >
                <ImageIcon />
                Add Image
              </label>
              {errors.image && (
                <p className="ml-2 self-start text-red-500">
                  {errors.image.message}
                </p>
              )}
            </div>
          ) : (
            <div className="relative h-[100px] w-full sm:h-[250px]">
              {media && (
                <>
                  <Image
                    src={media}
                    alt="blog image"
                    fill
                    className="absolute rounded-lg object-cover"
                  />
                  <label
                    htmlFor="image"
                    className="absolute right-2 top-2 z-10 cursor-pointer rounded-lg bg-black/40 px-2 py-1 text-white transition hover:bg-black"
                  >
                    Change image
                  </label>
                </>
              )}
            </div>
          )}

          <TextareaAutosize
            {...register("title", { required: "Title is required" })}
            placeholder="Title..."
            id="title"
            maxRows={4}
            className="w-full resize-none overscroll-contain border-none p-2 text-2xl font-bold placeholder-gray-300 outline-none sm:text-3xl md:text-5xl"
          />
          {errors.title && isDirty && (
            <p className="-mt-6 ml-2 text-red-500">{errors.title.message}</p>
          )}

          <TextareaAutosize
            {...register("abstract", { required: "Introduction is required" })}
            placeholder="Introduction..."
            maxRows={20}
            id="introduction"
            className="prose w-full max-w-none resize-none overscroll-contain border-none p-2 leading-tight placeholder-gray-400 outline-none lg:prose-lg"
          />
          {errors.abstract && isDirty && (
            <p className="-mt-6 ml-2 text-red-500">{errors.abstract.message}</p>
          )}

          <Controller
            render={({ field }) => (
              <TipTap onChange={field.onChange} body={field.value} />
            )}
            control={control}
            name="body"
            rules={{ required: "Body article is required" }}
          />
          {errors.body && isDirty && (
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
    </section>
  );
}
