import React, { useEffect, useState } from 'react'
import PostContent from '../components/Post-Content'
import { useLocation } from 'react-router-dom';
import { notify } from '../utils/notify';
import CommentInput from '../components/Comment-Input';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useCookies } from 'react-cookie';
import { userAtom, userFollowingAtom } from '../stores/atoms/user';
import CommentSection from '../components/Comment-Section';
import DefaultLoadSkeleton from '../components/Default-Load-Skeleton';

export default function Post() {
    const [postContent, setPostContent] = useState();
    const [postComments, setPostComment] = useState([]);
    const [title, setTitle] = useState("");
    const [loading, setLodaing] = useState(true);
    const location = useLocation();
    const postId = location.pathname.split("/").reverse()[0];
    const userInfo = useRecoilValue(userAtom);
    const [cookies] = useCookies(["authToken"]);
    const [userFollowing, setUsersFollowing] = useRecoilState(userFollowingAtom);


    const addComment = async (comment) => {
        if (comment) {
            const request = await fetch(`https://zupay-assignement-backend.vercel.app/api/v1/post/add-comment/${postId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${cookies.authToken}`
                },
                body: JSON.stringify({ username: userInfo.username, comment: comment })
            })
            if (request.status === 200) {
                const response = await request.json();
                setPostComment(prev => [...prev, { username: userInfo.username, comment: comment, _id: response.id }]);
                notify("Comment added", "success");

            } else {
                const error = await request.json();
                notify(error, "error");
            }
        }
    }

    const follow = async () => {
        const { authorId, author } = postContent;
        const request = await fetch(`https://zupay-assignement-backend.vercel.app/api/v1/user/follow/${authorId}?username=${author}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${cookies.authToken}`
            }
        })
        if (request.status === 200) {
            setUsersFollowing((prev) => [...prev, { authorId: authorId, username: author }]);
        } else {
            const error = await request.json();
            notify(error, "error");
        }
    }

    useEffect(() => {
        const fetchPostContent = (async () => {
            const request = await fetch(`https://zupay-assignement-backend.vercel.app/api/v1/post/${postId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            if (request.status === 200) {
                const data = await request.json();
                setPostContent(data);
                setPostComment(data.comments);
                setTitle(data.title);
                setLodaing(false);
            } else {
                const error = await request.json();
                notify(error, "error");
            }
        })
        fetchPostContent();
    }, [location])
    return (<>
        {
            loading ? <DefaultLoadSkeleton /> :
                <div className='bg-white xl:ml-60 xl:mr-60 lg:ml-40 lg:mr-40  p-2 md:p-10 rounded-lg'>
                    <PostContent postContent={postContent.content} title={title} author={postContent.author} authorId={postContent.authorId} follow={follow} alreadyFollowing={userFollowing.some(x => x.authorId === postContent.authorId)} />
                    <CommentInput addComment={addComment} />
                    <CommentSection postComments={postComments} />
                </div>
        }
    </>
    )
}
