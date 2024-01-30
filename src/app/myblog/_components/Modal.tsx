import { BlogType } from "@/libs/types";
import React from "react";
import { deleteBlog } from "../_libs/deleteBlog";
import { KeyedMutator } from "swr";

export default function Modal({
  handleModal,
  content,
  mutate,
}: {
  handleModal: () => void;
  content: BlogType;
  mutate: KeyedMutator<any>;
}) {
  return (
    <dialog className="fixed left-1/2 z-20 flex h-1/2 w-[512px] -translate-x-1/2 flex-col items-center justify-center gap-6 rounded-2xl bg-white px-16 shadow-lg">
      <h1 className="text-center text-3xl font-bold">Are you sure?</h1>
      <p className="softTextColor text-center">
        This action cannot be undone. All data associated with this blog will be
        lost.
      </p>

      <div className="flex w-full flex-col gap-3">
        <button
          onClick={async () => {
            await deleteBlog(content.slug, content, mutate);
            handleModal();
          }}
          className="w-full rounded-lg bg-red-500 py-3 text-white transition hover:bg-red-700"
        >
          Delete blog
        </button>
        <button
          onClick={handleModal}
          className="w-full rounded-lg border border-black/25 bg-white py-3 text-gray-900"
        >
          Cancel
        </button>
      </div>
    </dialog>
  );
}
