"use client";

import React, { useState } from "react";
import Blog from "./_components/Blog";
import { BlogType } from "@/libs/types";
import BlogSkeleton from "../../components/skeleton/BlogSkeleton";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "./_libs/fetcher";
import Modal from "./_components/Modal";

export default function MyBlog() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { status } = useSession();

  if (status === "unauthenticated") {
    redirect("/login");
  }

  const { data, isLoading, mutate } = useSWR("/api/myblog", fetcher);

  const handleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <section
      id="blog"
      className="container mt-24 flex flex-col items-center justify-center gap-16"
    >
      <h1 className="text-center text-3xl font-bold">My Blog</h1>
      <div className="grid grid-cols-1 gap-x-6 gap-y-16 px-4 sm:grid-cols-2 md:grid-cols-3 lg:gap-x-12">
        {!isLoading ? (
          data.map((post: BlogType) => (
            <>
              <Blog
                key={post.id}
                content={post}
                name={post.user.name}
                handleModal={handleModal}
              />
              {showModal && (
                <>
                  <Modal
                    handleModal={handleModal}
                    content={post}
                    mutate={mutate}
                  />
                  <div className="absolute left-0 top-0 h-screen w-screen bg-black/25"></div>
                </>
              )}
            </>
          ))
        ) : (
          <>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </>
        )}
      </div>
    </section>
  );
}
