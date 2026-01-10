'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Youtube from '@tiptap/extension-youtube';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { Bold, Italic, Underline as UnderlineIcon, List, ListOrdered, Quote, Link as LinkIcon, Image as ImageIcon, Youtube as YoutubeIcon, AlignLeft, AlignCenter, AlignRight, Undo, Redo, Code, Heading1 as H1, Heading2 as H2 } from 'lucide-react';
import { useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';

const MenuBar = ({ editor }) => {
    if (!editor) {
        return null;
    }

    const addImage = useCallback(() => {
        const url = window.prompt('URL');
        if (url) {
            editor.chain().focus().setImage({ src: url }).run();
        }
    }, [editor]);

    const addYoutube = useCallback(() => {
        const url = window.prompt('Enter YouTube URL');
        if (url) {
            editor.commands.setYoutubeVideo({
                src: url,
            });
        }
    }, [editor]);

    const setLink = useCallback(() => {
        const previousUrl = editor.getAttributes('link').href;
        const url = window.prompt('URL', previousUrl);

        // cancelled
        if (url === null) {
            return;
        }

        // empty
        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();
            return;
        }

        // update link
        editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
    }, [editor]);

    const uploadImage = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const toastId = toast.loading("Uploading image...");

        try {
            const formData = new FormData();
            formData.append('file', file);

            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) throw new Error('Upload failed');
            const data = await res.json();

            editor.chain().focus().setImage({ src: data.url }).run();
            toast.success("Image uploaded!");
        } catch (err) {
            console.error(err);
            toast.error("Failed to upload image");
        } finally {
            toast.dismiss(toastId);
        }
    };

    return (
        <div className="border border-gray-700 rounded-t-lg bg-gray-800 p-2 flex flex-wrap gap-2 sticky top-0 z-10">
            <div className="flex gap-1 border-r border-gray-700 pr-2">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editor.can().chain().focus().toggleBold().run()}
                    className={`p-1.5 rounded hover:bg-gray-700 transition ${editor.isActive('bold') ? 'bg-gray-700 text-blue-400' : 'text-gray-300'}`}
                    title="Bold"
                >
                    <Bold className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={!editor.can().chain().focus().toggleItalic().run()}
                    className={`p-1.5 rounded hover:bg-gray-700 transition ${editor.isActive('italic') ? 'bg-gray-700 text-blue-400' : 'text-gray-300'}`}
                    title="Italic"
                >
                    <Italic className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={`p-1.5 rounded hover:bg-gray-700 transition ${editor.isActive('underline') ? 'bg-gray-700 text-blue-400' : 'text-gray-300'}`}
                    title="Underline"
                >
                    <UnderlineIcon className="w-4 h-4" />
                </button>
            </div>

            <div className="flex gap-1 border-r border-gray-700 pr-2">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={`p-1.5 rounded hover:bg-gray-700 transition ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-700 text-blue-400' : 'text-gray-300'}`}
                    title="Heading 1"
                >
                    <H1 className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`p-1.5 rounded hover:bg-gray-700 transition ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-700 text-blue-400' : 'text-gray-300'}`}
                    title="Heading 2"
                >
                    <H2 className="w-4 h-4" />
                </button>
            </div>

            <div className="flex gap-1 border-r border-gray-700 pr-2">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`p-1.5 rounded hover:bg-gray-700 transition ${editor.isActive('bulletList') ? 'bg-gray-700 text-blue-400' : 'text-gray-300'}`}
                    title="Bullet List"
                >
                    <List className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`p-1.5 rounded hover:bg-gray-700 transition ${editor.isActive('orderedList') ? 'bg-gray-700 text-blue-400' : 'text-gray-300'}`}
                    title="Ordered List"
                >
                    <ListOrdered className="w-4 h-4" />
                </button>
            </div>

            <div className="flex gap-1 border-r border-gray-700 pr-2">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    className={`p-1.5 rounded hover:bg-gray-700 transition ${editor.isActive({ textAlign: 'left' }) ? 'bg-gray-700 text-blue-400' : 'text-gray-300'}`}
                    title="Align Left"
                >
                    <AlignLeft className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    className={`p-1.5 rounded hover:bg-gray-700 transition ${editor.isActive({ textAlign: 'center' }) ? 'bg-gray-700 text-blue-400' : 'text-gray-300'}`}
                    title="Align Center"
                >
                    <AlignCenter className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    className={`p-1.5 rounded hover:bg-gray-700 transition ${editor.isActive({ textAlign: 'right' }) ? 'bg-gray-700 text-blue-400' : 'text-gray-300'}`}
                    title="Align Right"
                >
                    <AlignRight className="w-4 h-4" />
                </button>
            </div>

            <div className="flex gap-1 border-r border-gray-700 pr-2">
                <button
                    type="button"
                    onClick={setLink}
                    className={`p-1.5 rounded hover:bg-gray-700 transition ${editor.isActive('link') ? 'bg-gray-700 text-blue-400' : 'text-gray-300'}`}
                    title="Link"
                >
                    <LinkIcon className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    onClick={() => document.getElementById('tiptap-image-upload').click()}
                    className="p-1.5 rounded hover:bg-gray-700 transition text-gray-300"
                    title="Image"
                >
                    <ImageIcon className="w-4 h-4" />
                </button>
                <input
                    id="tiptap-image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={uploadImage}
                />
                <button
                    type="button"
                    onClick={addYoutube}
                    className={`p-1.5 rounded hover:bg-gray-700 transition ${editor.isActive('youtube') ? 'bg-gray-700 text-blue-400' : 'text-gray-300'}`}
                    title="Youtube"
                >
                    <YoutubeIcon className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    className={`p-1.5 rounded hover:bg-gray-700 transition ${editor.isActive('blockquote') ? 'bg-gray-700 text-blue-400' : 'text-gray-300'}`}
                    title="Quote"
                >
                    <Quote className="w-4 h-4" />
                </button>
            </div>

            <div className="flex gap-1">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().chain().focus().undo().run()}
                    className="p-1.5 rounded hover:bg-gray-700 transition text-gray-300 disabled:opacity-50"
                    title="Undo"
                >
                    <Undo className="w-4 h-4" />
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().chain().focus().redo().run()}
                    className="p-1.5 rounded hover:bg-gray-700 transition text-gray-300 disabled:opacity-50"
                    title="Redo"
                >
                    <Redo className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default function RichTextEditor({ content, onChange, placeholder = 'Start writing...' }) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Image.configure({
                inline: true,
                allowBase64: true,
            }),
            Link.configure({
                openOnClick: false,
            }),
            Youtube.configure({
                controls: false,
            }),
            Underline,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
        ],
        content: content || '',
        editorProps: {
            attributes: {
                class: 'prose prose-invert max-w-none focus:outline-none min-h-[300px] p-4 bg-gray-700/50 rounded-b-lg',
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        immediatelyRender: false,
    });

    // Update editor content if the prop changes recursively (and seemingly from external source aka initial load)
    useEffect(() => {
        if (editor && content && editor.getHTML() !== content) {
            // Only set content if it's different to prevent cursor jumps or accidental overwrites during typing if sync isn't perfect
            // However, for initial load "Edit" this is key.
            // We can check if editor is empty or if we are just starting.
            // A simple way is to check if the incoming content is significantly different 
            // or just rely on the fact that this usually happens on mount/remount.

            // BUT: Tiptap shouldn't be controlled this way for every keystroke.
            // We need to ensure this runs only when the "initial" content loads or changes from "outside" (like database fetch)
            // The `content` prop here is controlled by the parent. 
            // If we just set it, we might create a loop.

            // Better approach: ONLY set content if the editor is empty OR if we explicitly want to reset it.
            // For "Editing" scenario, the parent `content` is populated initially.
            // The `useEditor` hook `content` option handles the initial render.
            // BUT, if the data comes in LATER (async), `useEditor` might have already initialized with empty string.

            editor.commands.setContent(content);
        }
    }, [content, editor]);

    return (
        <div className="w-full">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
            <style jsx global>{`
        .ProseMirror p.is-editor-empty:first-child::before {
          color: #adb5bd;
          content: attr(data-placeholder);
          float: left;
          height: 0;
          pointer-events: none;
        }
        .ProseMirror img {
            max-width: 100%;
            height: auto;
            border-radius: 0.5rem;
        }
        .ProseMirror iframe {
            width: 100%;
            aspect-ratio: 16 / 9;
            border-radius: 0.5rem;
        }
      `}</style>
        </div>
    );
}
