"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import TipTap from "@/components/tiptap/TipTap";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ImageIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import useSWR from "swr";
import { uploadImage } from "@/libs/uploadImage";
import slugify from "slugify";
import { EditBlogType } from "@/libs/types";
import { fetcher } from "./_libs/fetcher";
import { deleteImage } from "@/libs/deleteImage";

async function getPost(url: string) {
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error);
  }

  return data;
}

export default function EditPage({ params }: { params: { slug: string } }) {
  const [file, setFile] = useState<File>();
  const [media, setMedia] = useState<string>();
  const [oldImage, setOldImage] = useState<string>();
  const [url, setUrl] = useState<string>();
  const [slug, setSlug] = useState<string>();
  const [isImageAdded, setIsImageAdded] = useState<boolean>(true);
  const [isSendingData, setIsSendingData] = useState<boolean>(false);
  const { status } = useSession();

  const { data, isLoading, error } = useSWR(
    `/api/edit/${params.slug}`,
    getPost,
  );

  if (status === "unauthenticated") {
    redirect("/login");
  }

  if (!isLoading && error) {
    redirect(`/blog/${params.slug}`);
  }

  const {
    register,
    handleSubmit,
    control,
    reset,
    getValues,
    formState: { errors, isDirty, isSubmitSuccessful },
  } = useForm<EditBlogType>({
    defaultValues: {
      title: "",
      abstract: "",
      body: "",
      image: undefined,
    },
  });

  useEffect(() => {
    if (!isLoading) {
      setOldImage(data.image);
      setMedia(data.image);
      reset({
        title: data.title,
        abstract: data.abstract,
        body: data.body,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, data]);

  useEffect(() => {
    if (!isLoading && url) {
      fetcher(
        {
          title: getValues("title"),
          abstract: getValues("abstract"),
          body: getValues("body"),
          slug: slugify(getValues("title").toLowerCase(), {
            remove: /[*+~.()'"!:@]/g,
          }),
        },
        url,
        data.slug,
        data.userEmail,
      ).then((res) => {
        setSlug(res.slug);
      });
      setIsSendingData(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful, url]);

  if (slug !== undefined && isSendingData === false) {
    if (url !== oldImage) deleteImage(oldImage as string);
    redirect(`/blog/${slug}`);
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

  const onSubmit: SubmitHandler<EditBlogType> = () => {
    setIsSendingData(true);
    uploadImage(file, setUrl, media);
  };

  return (
    <section className="container my-[64px] flex w-full flex-col items-center justify-center px-4 lg:max-w-screen-lg">
      {!isLoading && (
        <div className="my-12 flex w-full flex-col gap-8 self-start">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-8"
          >
            <input
              type="file"
              accept=".jpg, .jpeg, .png, .webp"
              {...register("image")}
              id="image"
              defaultValue={undefined}
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
              className="w-full resize-none overscroll-contain border-none bg-gray-50 p-2 text-2xl font-bold placeholder-gray-300 outline-none sm:text-3xl md:text-5xl"
            />
            {errors.title && isDirty && (
              <p className="-mt-6 ml-2 text-red-500">{errors.title.message}</p>
            )}

            <TextareaAutosize
              {...register("abstract", {
                required: "Introduction is required",
              })}
              placeholder="Introduction..."
              maxRows={20}
              id="introduction"
              className="prose w-full max-w-none resize-none overscroll-contain border-none bg-gray-50 p-2 leading-tight placeholder-gray-400 outline-none lg:prose-lg"
            />
            {errors.abstract && isDirty && (
              <p className="-mt-6 ml-2 text-red-500">
                {errors.abstract.message}
              </p>
            )}

            <Controller
              render={({ field }) => (
                <TipTap onChange={field.onChange} body={data.body} />
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
              className="btn flex w-max items-center justify-center gap-2 bg-gray-900 px-10 text-white transition hover:scale-105"
            >
              {!isSendingData ? (
                "Update"
              ) : (
                <>
                  <Loader2 className="animate-spin" />
                  Updating
                </>
              )}
            </button>
          </form>
        </div>
      )}
    </section>
  );
}
