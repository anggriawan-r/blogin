"use client";

import React from "react";
import "./tipTap.css";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Heading from "@tiptap/extension-heading";
import Underline from "@tiptap/extension-underline";
import EditorBar from "../EditorBar";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";

export default function TipTap({
  onChange,
  body,
}: {
  onChange: (richText: string) => void;
  body: string;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      Placeholder.configure({
        placeholder: "Write something …",
      }),
      Heading.configure({
        levels: [1, 2, 3],
      }),
      Underline,
      BulletList,
      OrderedList,
    ],
    content: body,
    editorProps: {
      attributes: {
        class:
          "rounded-md border-none min-h-[150px] outline-none my-2 px-4 py-2",
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
