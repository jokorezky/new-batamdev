"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { JSONContent } from "@tiptap/core";

interface RichTextEditorProps {
  content: JSONContent | string;
}

export default function RichTextEditor({ content }: RichTextEditorProps) {
  const aboutContent =
    typeof content === "string" ? JSON.parse(content) : content;

  const firstParagraph = {
    type: "doc",
    content: aboutContent?.content
      ? [aboutContent.content.find((block: any) => block.type === "paragraph")]
      : [],
  };

  const editor = useEditor({
    content: firstParagraph,
    editable: false,
    extensions: [StarterKit],
  });

  if (!editor) {
    return <div>Loading content...</div>;
  }

  return (
    <div className="prose prose-sm sm:prose lg:prose-lg max-w-none text-gray-800 w-full">
      <EditorContent editor={editor} />
    </div>
  );
}
