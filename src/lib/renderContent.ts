import { generateHTML } from "@tiptap/html/server";
import DOMPurify from "isomorphic-dompurify";
import StarterKit from "@tiptap/starter-kit";
import { Table } from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableHeader from "@tiptap/extension-table-header";
import TableCell from "@tiptap/extension-table-cell";

export const isValidTipTapContent = (content: any): boolean => {
  try {
    const parsed = typeof content === "string" ? JSON.parse(content) : content;

    // Validasi struktur dasar
    if (!parsed || typeof parsed !== "object") return false;
    if (parsed?.type !== "doc") return false;
    if (!Array.isArray(parsed.content)) return false;

    // Validasi setiap node - lebih fleksibel
    return parsed.content.every((node: any) => {
      if (!node || typeof node !== "object") return false;
      if (!node.type) return false;

      // Node dengan content array
      if (node.content && Array.isArray(node.content)) {
        return node.content.every(
          (child: any) => child && typeof child === "object" && child.type
        );
      }

      // Node dengan text langsung
      if (node.text) return true;

      // Node kosong (seperti paragraph kosong) masih valid
      return true;
    });
  } catch {
    return false;
  }
};

export const repairTipTapContent = (content: any): any => {
  try {
    if (isValidTipTapContent(content)) {
      return typeof content === "string" ? JSON.parse(content) : content;
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
          content: [{ type: "text", text: "Content format tidak didukung" }],
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

export const renderContentToString = (content: any): string => {
  try {
    if (!content) {
      return '<p class="text-gray-500">No content available</p>';
    }

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

    if (typeof content === "string" && content.startsWith("<")) {
      return DOMPurify.sanitize(content);
    }

    const repairedContent = repairTipTapContent(content);
    const html = generateHTML(repairedContent, extensions);
    return DOMPurify.sanitize(html);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    const rawContent = JSON.stringify(content, null, 2);

    return `
      <div class="bg-red-50 p-4 rounded-lg border border-red-200">
        <div class="flex items-center gap-2 text-red-800">
          <h3 class="font-medium">Content Error</h3>
        </div>
        <p class="text-red-600 text-sm mt-1">${errorMessage}</p>
        <details class="mt-2 text-sm">
          <summary class="cursor-pointer text-red-700">Show raw content</summary>
          <pre class="bg-white p-2 mt-1 rounded text-xs overflow-auto max-h-60">${rawContent}</pre>
        </details>
      </div>
    `;
  }
};

export const renderContent = (content: any) => {
  const htmlString = renderContentToString(content);
  return { __html: htmlString };
};
