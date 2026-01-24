"use client";

// @ts-nocheck
import React from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

// @ts-ignore
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
}

export const TextEditor: React.FC<TextEditorProps> = ({
  value,
  onChange,
  placeholder = "Write something...",
  readOnly = false,
  className = "",
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // @ts-ignore
  // const editorRef = useRef<typeof ReactQuill | null>(null);

  const editorStyle = {
    height: "200px",
    border: "none",
  };

  // Disable ESLint for the next line
  // eslint-disable-next-line
  return (
    <div className={`border p-2 rounded-lg ${className}`}>
      <ReactQuill
        // ref={editorRef}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        placeholder={placeholder}
        theme="snow"
        style={editorStyle}
        modules={{
          toolbar: readOnly
            ? false
            : [
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline", "strike"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["link", "image"],
              ["clean"],
            ],
        }}
      />
    </div>
  );
};
