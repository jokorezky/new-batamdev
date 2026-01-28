"use client";

import { useState, useEffect } from "react";
import DOMPurify from "isomorphic-dompurify";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";

interface EventContentRendererProps {
  content: any;
}

export default function EventContentRenderer({
  content,
}: EventContentRendererProps) {
  const [renderedContent, setRenderedContent] = useState<string>("");

  useEffect(() => {
    const renderContent = () => {
      try {
        if (!content) {
          setRenderedContent("");
          return;
        }

        if (typeof content === "string" && content.startsWith("<")) {
          const cleanHTML = DOMPurify.sanitize(content);
          setRenderedContent(cleanHTML);
          return;
        }

        const isValidTipTapContent = (content: any): boolean => {
          try {
            const parsed =
              typeof content === "string" ? JSON.parse(content) : content;

            if (!parsed || typeof parsed !== "object") return false;
            if (parsed?.type !== "doc") return false;
            if (!Array.isArray(parsed.content)) return false;

            return parsed.content.every((node: any) => {
              if (!node || typeof node !== "object") return false;
              if (!node.type) return false;

              if (node.content && Array.isArray(node.content)) {
                return node.content.every(
                  (child: any) =>
                    child && typeof child === "object" && child.type
                );
              }

              if (node.text) return true;
              return true;
            });
          } catch {
            return false;
          }
        };

        const repairTipTapContent = (content: any): any => {
          try {
            if (isValidTipTapContent(content)) {
              return typeof content === "string"
                ? JSON.parse(content)
                : content;
            }

            if (typeof content === "string") {
              try {
                const parsed = JSON.parse(content);
                return repairTipTapContent(parsed);
              } catch {
                return {
                  type: "doc",
                  content: [
                    {
                      type: "paragraph",
                      content: [{ type: "text", text: content }],
                    },
                  ],
                };
              }
            }

            if (Array.isArray(content)) {
              return { type: "doc", content };
            }

            if (content?.content && !content?.type) {
              return { type: "doc", content: [content] };
            }

            if (typeof content === "object" && content !== null) {
              if (content.content || content.text || content.type) {
                return { type: "doc", content: [content] };
              }
            }

            return {
              type: "doc",
              content: [
                {
                  type: "paragraph",
                  content: [
                    {
                      type: "text",
                      text: "Content format is not supported",
                    },
                  ],
                },
              ],
            };
          } catch (error) {
            console.error("Content repair failed:", error);
            return {
              type: "doc",
              content: [
                {
                  type: "paragraph",
                  content: [
                    { type: "text", text: "Error processing content" },
                  ],
                },
              ],
            };
          }
        };

        const extensions = [
          StarterKit.configure({
            paragraph: {
              HTMLAttributes: {
                class:
                  "my-3 leading-relaxed text-neutral-300 tracking-wide",
              },
            },
            heading: {
              HTMLAttributes: {
                class:
                  "font-extrabold my-6 text-red-500 tracking-tight",
              },
            },
            blockquote: {
              HTMLAttributes: {
                class:
                  "border-l-4 border-red-600 pl-4 italic text-neutral-400 my-4",
              },
            },
          }),
          Table.configure({
            HTMLAttributes: {
              class:
                "w-full border border-neutral-800 rounded-lg overflow-hidden my-6",
            },
            resizable: true,
          }),
          TableRow,
          TableHeader.configure({
            HTMLAttributes: {
              class:
                "bg-black text-red-500 font-semibold border-b border-red-700",
            },
          }),
          TableCell.configure({
            HTMLAttributes: {
              class:
                "border border-neutral-800 px-4 py-2 text-neutral-300",
            },
          }),
        ];

        const repairedContent = repairTipTapContent(content);
        const html = generateHTML(repairedContent, extensions);
        const cleanHTML = DOMPurify.sanitize(html);

        setRenderedContent(cleanHTML);
      } catch (error) {
        console.error("Error rendering content:", error);
        setRenderedContent("");
      }
    };

    renderContent();
  }, [content]);

  if (!content) {
    return (
      <p className="text-neutral-500 italic">
        No content available
      </p>
    );
  }

  if (!renderedContent) {
    return (
      <div className="bg-black border border-red-700 rounded-xl p-5">
        <h3 className="text-red-500 font-semibold text-sm mb-1">
          Content Error
        </h3>
        <p className="text-red-400 text-xs">
          Failed to render event content
        </p>
        <details className="mt-3 text-xs text-neutral-400">
          <summary className="cursor-pointer hover:text-red-500">
            Show raw content
          </summary>
          <pre className="bg-neutral-900 border border-neutral-800 p-3 mt-2 rounded-lg overflow-auto max-h-60 text-neutral-300">
            {JSON.stringify(content, null, 2)}
          </pre>
        </details>
      </div>
    );
  }

  return (
    <div
      className="
        prose prose-invert max-w-none
        prose-p:text-neutral-300
        prose-strong:text-red-500
        prose-a:text-red-500 hover:prose-a:text-red-400
        prose-code:text-red-400
        prose-pre:bg-neutral-900
        prose-pre:border prose-pre:border-neutral-800
      "
      dangerouslySetInnerHTML={{ __html: renderedContent }}
    />
  );
}
