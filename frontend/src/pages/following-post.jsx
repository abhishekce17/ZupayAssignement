import React, { useEffect, useState } from 'react'
import TagLayout from '../components/TagLayout'
import { RedirecToLogin } from '../components/Authorization'
import { useRecoilValue } from 'recoil'
import { userFollowingAtom } from '../stores/atoms/user'
import PostLayout from '../components/Post-Layout'
import { notify } from '../utils/notify'
import { useCookies } from 'react-cookie'
import PostLoadSkeleton from '../components/Post-Load-Skeleton'

export default function FollowingPost() {
    const userFollowing = useRecoilValue(userFollowingAtom);
    const [postsSnapshot, setPostsSnapshot] = useState([]);
    const [cookies] = useCookies(["authToken"]);
    const [selectedAuthor, setSelectedAuthor] = useState("all");
    const [loading, setLodaing] = useState(true);

    useEffect(() => {
        const fetchPostsSnapshot = async () => {
            const uri = selectedAuthor === "all" ? `https://zupay-assignement-backend.vercel.app/api/v1/post/author` : `https://zupay-assignement-backend.vercel.app/api/v1/post/author/${selectedAuthor}`;
            const method = selectedAuthor === "all" ? "POST" : "GET";
            const request = await fetch(uri, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${cookies.authToken}`
                },
                body: selectedAuthor === "all" ? JSON.stringify(userFollowing.map(x => x.authorId)) : undefined
            })
            if (request.status === 200) {
                const response = await request.json();
                setPostsSnapshot(response);
            } else {
                const error = await request.json();
                notify(error, "error");
            }
            setLodaing(false);
        }

        if (cookies.authToken) {
            fetchPostsSnapshot()
        }
    }, [selectedAuthor]);
    return (<RedirecToLogin>
        {loading ? <PostLoadSkeleton /> : <div>
            <div className='tags flex gap-6 mb-2 overflow-x-scroll no-scrollbar' >
                <TagLayout selected={selectedAuthor === "all"} >
                    <button onClick={() => setSelectedAuthor("all")} >
                        all
                    </button>
                </TagLayout>
                {
                    userFollowing.map((author, index) => {
                        return (
                            <TagLayout selected={selectedAuthor === author.authorId} key={author._id} >
                                <button onClick={() => setSelectedAuthor(author.authorId)} >
                                    {author.username}
                                </button>
                            </TagLayout>
                        )
                    })
                }
            </div>
            <PostLayout postsSnapshot={postsSnapshot} />
        </div>}
    </RedirecToLogin>
    )
}
