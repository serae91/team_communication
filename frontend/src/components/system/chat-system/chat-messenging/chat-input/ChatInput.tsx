import './ChatInput.scss';
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { TextStyle } from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
import Placeholder from "@tiptap/extension-placeholder";

import { Box, IconButton, MenuItem, Paper, Select, Toolbar, } from "@mui/material";

import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";

type ChatInputProps = {
  onSend: (html: string) => void;
};

const ChatInput = ({onSend}: ChatInputProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      FontFamily,
      Placeholder.configure({
        placeholder: "Nachricht schreiben …",
      }),
    ],
    editorProps: {
      handleKeyDown(_, event) {
        if (event.key === "Enter" && !event.shiftKey) {
          event.preventDefault();

          const html = editor?.getHTML() ?? "";
          if (html !== "<p></p>") {
            onSend(html);
            editor?.commands.clearContent();
          }
          return true;
        }
        return false;
      },
      attributes: {
        class: "chat-editor",
      },
    },
  });

  if (!editor) return null;

  return (
    <Paper variant="outlined">
      {/* TOOLBAR */ }
      <Toolbar variant="dense">
        <Select
          size="small"
          value={ editor.getAttributes("textStyle").fontFamily || "Inter" }
          onChange={ (e) =>
            editor.chain().focus().setFontFamily(e.target.value).run()
          }
          sx={ {mr: 1, minWidth: 140} }
        >
          <MenuItem value="Inter">Inter</MenuItem>
          <MenuItem value="Arial">Arial</MenuItem>
          <MenuItem value="Times New Roman">Times New Roman</MenuItem>
        </Select>

        <IconButton
          color={ editor.isActive("bold") ? "primary" : "default" }
          onClick={ () => editor.chain().focus().toggleBold().run() }
        >
          <FormatBoldIcon/>
        </IconButton>

        <IconButton
          color={ editor.isActive("italic") ? "primary" : "default" }
          onClick={ () => editor.chain().focus().toggleItalic().run() }
        >
          <FormatItalicIcon/>
        </IconButton>

        <IconButton
          color={ editor.isActive("bulletList") ? "primary" : "default" }
          onClick={ () =>
            editor.chain().focus().toggleBulletList().run()
          }
        >
          <FormatListBulletedIcon/>
        </IconButton>
      </Toolbar>

      {/* EDITOR */ }
      <Box px={ 2 } py={ 1 }>
        <EditorContent editor={ editor }/>
      </Box>
    </Paper>
  );
}

export default ChatInput;
