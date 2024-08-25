import React, { useEffect, useState } from 'react'
import { Editor } from '../components/Editor'
import { useLocation } from 'react-router-dom';
import { notify } from '../utils/notify';

export default function EditPost() {
    const location = useLocation();
    const [postContent, setPostContent] = useState();
    const postId = location.pathname.split("/").reverse()[0];
    useEffect(() => {
        const fetchPostContent = async () => {
            const request = await fetch(`http://localhost:5000/api/v1/post/${postId}`, {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            if (request.status === 200) {
                const response = await request.json();
                setPostContent(response);
            } else {
                const { error } = await request.json();
                notify(error, "error");
            }
        }
        fetchPostContent();
    }, []);
    return (
        <div className="h-full" >
            <Editor placeholder={'Write something...'} postContent={postContent} />
        </div>
    )
}
