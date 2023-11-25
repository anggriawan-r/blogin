"use client";

import React from "react";
import "./tipTap.css";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import EditorBar from "../EditorBar";

export default function TipTap({
  onChange,
  body,
}: {
  onChange: (richText: string) => void;
  body: string;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2],
        },
      }),
      Placeholder.configure({
        placeholder: "Write something …",
      }),
      Underline,
    ],
    content: body,
    editorProps: {
      attributes: {
        class:
          "rounded-md border-none min-h-[150px] outline-none my-2 px-4 py-2 prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg focus:outline-none max-w-none w-full",
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      onChange(html);
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      <EditorBar editor={editor} />
      <div className="rounded-xl border border-black/10">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
