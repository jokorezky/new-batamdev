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
                    { type: "text", text: "Content format tidak didukung" },
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
                  content: [{ type: "text", text: "Error memproses konten" }],
                },
              ],
            };
          }
        };

        const extensions = [
          StarterKit.configure({
            paragraph: {
              HTMLAttributes: {
                class: "my-2 leading-relaxed",
              },
            },
            heading: {
              HTMLAttributes: {
                class: "font-bold my-4",
              },
            },
          }),
          Table.configure({ resizable: true }),
          TableRow,
          TableHeader,
          TableCell,
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
    return <p className="text-gray-500">No content available</p>;
  }

  if (!renderedContent) {
    return (
      <div className="bg-red-50 p-4 rounded-lg border border-red-200">
        <div className="flex items-center gap-2 text-red-800">
          <h3 className="font-medium">Content Error</h3>
        </div>
        <p className="text-red-600 text-sm mt-1">Error rendering content</p>
        <details className="mt-2 text-sm">
          <summary className="cursor-pointer text-red-700">
            Show raw content
          </summary>
          <pre className="bg-white p-2 mt-1 rounded text-xs overflow-auto max-h-60">
            {JSON.stringify(content, null, 2)}
          </pre>
        </details>
      </div>
    );
  }

  return (
    <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: renderedContent }}
    />
  );
}
