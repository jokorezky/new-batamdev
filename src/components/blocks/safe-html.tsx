"use client";

import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import { generateHTML } from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Image from "@tiptap/extension-image";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";

export default function SafeHTML({ html }: { html: string }) {
  const [sanitized, setSanitized] = useState("");

  useEffect(() => {
    if (!html) return;

    try {
      let finalHTML = "";

      if (html.trim().startsWith("{")) {
        const json = JSON.parse(html);
        if (json?.type === "doc") {
          finalHTML = generateHTML(json, [
            StarterKit,
            TextStyle,
            Color,
            TaskList,
            TaskItem,
            Image,
            Table,
            TableRow,
            TableCell,
            TableHeader,
          ]);
        }
      }

      if (!finalHTML) finalHTML = html;

      setSanitized(DOMPurify.sanitize(finalHTML));
    } catch (err) {
      console.error("SAFEHTML ERROR:", err);
      setSanitized("");
    }
  }, [html]);

  return (
    <div
      className="prose prose-sm max-w-none dark:prose-invert"
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
}
