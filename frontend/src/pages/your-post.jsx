import React, { useEffect, useState } from 'react'
import AddLogo from '../components/Add-Logo'
import TagLayout from '../components/TagLayout'
import { Link } from 'react-router-dom'
import PostLayout from '../components/Post-Layout'
import { notify } from '../utils/notify'
import { useRecoilValue } from 'recoil'
import { userAtom } from '../stores/atoms/user'
import { RedirecToLogin } from '../components/Authorization'
import { useCookies } from 'react-cookie'
import PostLoadSkeleton from '../components/Post-Load-Skeleton'

export default function YourPost() {
    const [postsSnapshot, setPostSnapshot] = useState([]);
    const userInfo = useRecoilValue(userAtom);
    const [cookies] = useCookies(["authToken"]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPostsSnapshot = async () => {
            const request = await fetch(`https://zupay-assignement-backend.vercel.app/api/v1/post/author/${userInfo.userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            if (request.status === 200) {
                const response = await request.json();
                setPostSnapshot(response);
            } else {
                const error = await request.json();
                notify(error, "error");
            }
        }
        if (cookies.authToken) {
            fetchPostsSnapshot()
        }
        setLoading(false);
    }, []);



    return (
        <RedirecToLogin>
            {loading ? <PostLoadSkeleton /> : <div>
                <PostLayout postsSnapshot={postsSnapshot} editIcon={true} deleteIcon={true} />
                <Link to="add-post" className=" bg-primary h-max p-3 rounded-xl absolute bottom-24 md:bottom-12 right-6">
                    <AddLogo fillColor={"#ffffff"} />
                </Link>
            </div>}
        </RedirecToLogin>
    )
}
