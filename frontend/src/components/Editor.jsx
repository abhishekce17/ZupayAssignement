import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import PropTypes from 'prop-types';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import Button from './Button';
import uploader from '../utils/imageUploader';

export const Editor = ({ placeholder }) => {
    const [editorHtml, setEditorHtml] = useState('');
    const quillRef = useRef(null);

    const handleSave = () => {
        const contentHtml = quillRef.current.getEditor().root.innerHTML.replace(/<img[^>]+>/g, (imgTag) => {
            return imgTag.replace(/(width\s*=\s*"[0-9]+")/, 'width="300"');
        }); // Get HTML content
        // saveContentToDatabase(contentHtml);
        console.log(contentHtml);
    };

    const handleImageUpload = () => {
        const editor = quillRef.current.getEditor();
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            if (file) {
                // Create FormData and upload the image
                const formData = new FormData();
                formData.append('file', file);

                const uploadResponse = await uploader(formData);
                if (uploadResponse.status === 200) {
                    const imageUrl = uploadResponse.imgLinkArray[0];
                    console.log(imageUrl);
                    // Get the current selection
                    const range = editor.getSelection(true);
                    console.log(range);
                    // Check if the selection range is valid
                    if (range) {
                        // Insert the image URL at the current cursor position
                        editor.insertEmbed(range.index, 'image', imageUrl);
                        // Move the cursor to the end of the inserted image
                        editor.setSelection(range.index + 1);
                    } else {
                        console.error('Invalid range: Could not insert the image');
                    }
                } else {
                    console.error('Image upload failed:', uploadResponse.error);
                }
            }
        };
    };

    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [
                { list: 'ordered' },
                { list: 'bullet' },
                { indent: '-1' },
                { indent: '+1' },
            ],
            ['link', 'image'],
            // ['clean'],
        ],

        clipboard: {
            matchVisual: false,
        },
    };

    const handleChange = (content, delta, source, editor) => {
        setEditorHtml(editor.getHTML());
        console.log(editor.getHTML())
        // You can access more properties from the editor if needed
    };


    useEffect(() => {
        // @ts-ignore
        quillRef.current
            .getEditor()
            .getModule('toolbar')
            .addHandler('image', handleImageUpload)
    }, [quillRef])


    return (
        <div className="editor-container flex flex-col items-center gap-3 w-full">
            <ReactQuill
                className="bg-white w-full custom-img"
                ref={quillRef}
                theme="snow"
                value={editorHtml}
                onChange={handleChange}
                modules={modules}
                formats={formats}
                placeholder={placeholder}
            />
            <Button>
                <button className="font-semibold" onClick={handleSave} >Publish</button>
            </Button>
        </div>
    );
};

/* 
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */



/* 
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'video',
];

Editor.propTypes = {
    placeholder: PropTypes.string,
};
