import React, { useEffect, useState } from 'react'
import { Editor } from '../components/Editor'
import { useLocation } from 'react-router-dom';
import { notify } from '../utils/notify';
import { RedirecToLogin } from '../components/Authorization';
import DefaultLoadSkeleton from '../components/Default-Load-Skeleton';

export default function EditPost() {
    const location = useLocation();
    const [postContent, setPostContent] = useState();
    const postId = location.pathname.split("/").reverse()[0];
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchPostContent = async () => {
            const request = await fetch(`https://zupay-assignement-backend.vercel.app/api/v1/post/${postId}`, {
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
            setLoading(false);
        }
        fetchPostContent();
    }, []);
    return (
        <RedirecToLogin>
            {
                loading ? <DefaultLoadSkeleton /> :
                    <div className="h-full" >
                        <Editor placeholder={'Write something...'} postContent={postContent} edit={true} />
                    </div>
            }
        </RedirecToLogin>
    )
}
