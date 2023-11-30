import { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  LucideHeading1,
  LucideHeading2,
  LucideUnderline,
  Strikethrough,
} from "lucide-react";

export default function EditorBar({ editor }: { editor: Editor }) {
  if (!editor) {
    return null;
  }

  return (
    <div className="sticky top-[72px] z-10 flex flex-wrap items-center gap-2 rounded-xl border border-black/10 bg-white/90 p-2 backdrop-blur-lg">
      <button
        onClick={(e) => {
          editor.chain().focus().toggleBold().run();
          e.preventDefault();
        }}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`editor-btn ${
          editor.isActive("bold") && "bg-gray-200 text-gray-900"
        }`}
      >
        <Bold />
      </button>

      <button
        onClick={(e) => {
          editor.chain().focus().toggleItalic().run();
          e.preventDefault();
        }}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`editor-btn ${
          editor.isActive("italic") && "bg-gray-200 text-gray-900"
        }`}
      >
        <Italic />
      </button>

      <button
        onClick={(e) => {
          editor.chain().focus().toggleStrike().run();
          e.preventDefault();
        }}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`editor-btn ${
          editor.isActive("strike") && "bg-gray-200 text-gray-900"
        }`}
      >
        <Strikethrough />
      </button>

      <button
        onClick={(e) => {
          editor.chain().focus().toggleUnderline().run();
          e.preventDefault();
        }}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        className={`editor-btn ${
          editor.isActive("underline") && "bg-gray-200 text-gray-900"
        }`}
      >
        <LucideUnderline />
      </button>

      <button
        onClick={(e) => {
          editor.chain().focus().toggleHeading({ level: 1 }).run();
          e.preventDefault();
        }}
        disabled={
          !editor.can().chain().focus().toggleHeading({ level: 1 }).run()
        }
        className={`editor-btn ${
          editor.isActive("heading", { level: 1 }) &&
          "bg-gray-200 text-gray-900"
        }`}
      >
        <LucideHeading1 />
      </button>

      <button
        onClick={(e) => {
          editor.chain().focus().toggleHeading({ level: 2 }).run();
          e.preventDefault();
        }}
        disabled={
          !editor.can().chain().focus().toggleHeading({ level: 2 }).run()
        }
        className={`editor-btn ${
          editor.isActive("heading", { level: 2 }) &&
          "bg-gray-200 text-gray-900"
        }`}
      >
        <LucideHeading2 />
      </button>

      <button
        onClick={(e) => {
          editor.chain().focus().toggleBulletList().run();
          e.preventDefault();
        }}
        disabled={!editor.can().chain().focus().toggleBulletList().run()}
        className={`editor-btn ${
          editor.isActive("bulletList") && "bg-gray-200 text-gray-900"
        }`}
      >
        <List />
      </button>

      <button
        onClick={(e) => {
          editor.chain().focus().toggleOrderedList().run();
          e.preventDefault();
        }}
        disabled={!editor.can().chain().focus().toggleOrderedList().run()}
        className={`editor-btn ${
          editor.isActive("orderedList") && "bg-gray-200 text-gray-900"
        }`}
      >
        <ListOrdered />
      </button>
    </div>
  );
}
