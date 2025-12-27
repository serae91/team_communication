import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';
import './BLChatMessage.scss';

const BLChatMessage = ({html}: { html: string }) => {
  const editor = useEditor({
    editable: false,
    extensions: [StarterKit],
  });

  useEffect(() => {
    if (editor && html) {
      editor.commands.setContent(html);
    }
  }, [editor, html]);

  if (!editor) return null;
  console.log('editor exists', html);
  return (
    <div className="bl-chat-message">
      <EditorContent editor={ editor }/>
    </div>
  );
};

export default BLChatMessage;
