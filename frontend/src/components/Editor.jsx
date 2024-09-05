import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import PropTypes from 'prop-types';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import Button from './Button';
import uploader from '../utils/imageUploader';
import { useNavigate } from 'react-router-dom';
import { notify } from '../utils/notify';
import { useCookies } from 'react-cookie';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../stores/atoms/user';

export const Editor = ({ placeholder, postContent, edit }) => {
    const navigate = useNavigate();
    const [editorHtml, setEditorHtml] = useState(postContent?.content || '');
    const quillRef = useRef(null);
    const [firstImgLink, setFirstImgLink] = useState(postContent?.firstImgLink || "")
    const [title, setTitle] = useState(postContent?.title || "");
    const [cookies] = useCookies(['authToken']);
    const userInfo = useRecoilValue(userAtom);

    const handleTitle = (e) => {
        const { value } = e.target;
        setTitle(value);
    }

    const handleSave = async () => {
        const contentHtml = quillRef.current.getEditor().root.innerHTML.replace(/<img[^>]+>/g, (imgTag) => {
            return imgTag.replace(/(width\s*=\s*"[0-9]+")/, 'width="300"');
        }); // Get HTML content
        // saveContentToDatabase(contentHtml);
        const uri = !edit ? "https://zupay-assignement-backend.vercel.app/api/v1/post" : `https://zupay-assignement-backend.vercel.app/api/v1/post/${postContent._id}`;
        const method = !edit ? "POST" : "PUT";
        const request = await fetch(uri, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${cookies.authToken}`
            },
            body: JSON.stringify({
                content: contentHtml,
                title: title,
                postedAt: Date.now(),
                author: userInfo.username,
                authorId: userInfo.userId,//userInfo.id
                firstImgLink: firstImgLink
            })
        })
        if (request.status === 200) {
            notify("Blog published", "success");
            navigate("/your-post");
        } else {
            const error = await request.json();
            notify(error, "error")
        }
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
                    if (!firstImgLink) {
                        setFirstImgLink(imageUrl)
                    }
                    // Get the current selection
                    const range = editor.getSelection(true);
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
            <div className='flex flex-col gap-1 w-full' >
                <label htmlFor='name' className="justify-start font-bold" >Title</label>
                <textarea onChange={handleTitle} name='name' id='name' type="text" className="bg-white outline-none p-1 rounded text-lg font-semibold resize-none" value={title} rows="3" required />
            </div>
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
