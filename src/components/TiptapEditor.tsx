"use client";
import type { Editor, JSONContent } from "@/components/ui/tiptap-editor";
import {
  EditorBubbleMenu,
  EditorClearFormatting,
  EditorFloatingMenu,
  EditorFormatBold,
  EditorFormatCode,
  EditorFormatItalic,
  EditorFormatStrike,
  EditorFormatSubscript,
  EditorFormatSuperscript,
  EditorFormatUnderline,
  EditorLinkSelector,
  EditorNodeBulletList,
  EditorNodeCode,
  EditorNodeHeading1,
  EditorNodeHeading2,
  EditorNodeHeading3,
  EditorNodeImage,
  EditorNodeOrderedList,
  EditorNodeQuote,
  EditorNodeTable,
  EditorNodeTaskList,
  EditorNodeText,
  EditorProvider,
  EditorSelector,
  EditorTableColumnAfter,
  EditorTableColumnBefore,
  EditorTableColumnDelete,
  EditorTableColumnMenu,
  EditorTableDelete,
  EditorTableFix,
  EditorTableGlobalMenu,
  EditorTableHeaderColumnToggle,
  EditorTableHeaderRowToggle,
  EditorTableMenu,
  EditorTableMergeCells,
  EditorTableRowAfter,
  EditorTableRowBefore,
  EditorTableRowDelete,
  EditorTableRowMenu,
  EditorTableSplitCell,
} from "@/components/ui/tiptap-editor";
import TiptapImage from "@tiptap/extension-image";
import { useState } from "react";

type TiptapEditorInputProps = {
  initialContent?: JSONContent;
  onChange?: (content: JSONContent) => void;
  imageInline?: boolean;
  placeholder?: string;
};

const TiptapEditorInput = ({
  initialContent,
  onChange,
  imageInline = false,
  placeholder,
}: TiptapEditorInputProps) => {
  const [content, setContent] = useState<JSONContent>(
    initialContent || {
      type: "doc",
      content: [{ type: "paragraph" }],
    }
  );
  const handleUpdate = ({ editor }: { editor: Editor }) => {
    const json = editor.getJSON();
    setContent(json);
    onChange?.(json);
  };
  return (
    <EditorProvider
      className="min-h-32 py-10 max-h-[50vh] w-full overflow-y-auto rounded-lg border bg-input/20 p-4"
      content={content}
      onUpdate={handleUpdate}
      placeholder={placeholder}
      extensions={[
        TiptapImage.configure({
          inline: false,
          allowBase64: true,
        }),
      ]}
    >
      <EditorFloatingMenu>
        <EditorNodeHeading1 hideName />
        <EditorNodeBulletList hideName />
        <EditorNodeOrderedList hideName />
        <EditorNodeTaskList hideName />
        <EditorNodeQuote hideName />
        <EditorNodeCode hideName />
        {imageInline && <EditorNodeTable hideName />}
        {imageInline && <EditorNodeImage hideName />}
      </EditorFloatingMenu>
      <EditorBubbleMenu>
        <EditorSelector title="Text">
          <EditorNodeText />
          <EditorNodeHeading1 />
          <EditorNodeHeading2 />
          <EditorNodeHeading3 />
          <EditorNodeBulletList />
          <EditorNodeOrderedList />
          <EditorNodeTaskList />
          <EditorNodeQuote />
          <EditorNodeCode />
        </EditorSelector>
        <EditorSelector title="Format">
          <EditorFormatBold />
          <EditorFormatItalic />
          <EditorFormatUnderline />
          <EditorFormatStrike />
          <EditorFormatCode />
          <EditorFormatSuperscript />
          <EditorFormatSubscript />
        </EditorSelector>
        <EditorLinkSelector />
        <EditorClearFormatting />
      </EditorBubbleMenu>
      <EditorTableMenu>
        <EditorTableColumnMenu>
          <EditorTableColumnBefore />
          <EditorTableColumnAfter />
          <EditorTableColumnDelete />
        </EditorTableColumnMenu>
        <EditorTableRowMenu>
          <EditorTableRowBefore />
          <EditorTableRowAfter />
          <EditorTableRowDelete />
        </EditorTableRowMenu>
        <EditorTableGlobalMenu>
          <EditorTableHeaderColumnToggle />
          <EditorTableHeaderRowToggle />
          <EditorTableDelete />
          <EditorTableMergeCells />
          <EditorTableSplitCell />
          <EditorTableFix />
        </EditorTableGlobalMenu>
      </EditorTableMenu>
      {/* <EditorCharacterCount.Words>Words: </EditorCharacterCount.Words> */}
    </EditorProvider>
  );
};
export default TiptapEditorInput;
