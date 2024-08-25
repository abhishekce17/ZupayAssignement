import React, { useEffect, useState } from 'react'
import { notify } from '../utils/notify';
import PostLayout from '../components/Post-Layout';
import PostLoadSkeleton from '../components/Post-Load-Skeleton';

function Home() {
    const [postsSnapshot, setPostSnapshot] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPostsSnapshot = async () => {
            const request = await fetch(`https://zupay-assignement-backend.vercel.app/api/v1/post`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            if (request.status === 200) {
                const response = await request.json();
                setPostSnapshot(response);
            } else {
                const { error } = await request.json();
                notify(error, "error");
            }
        }

        fetchPostsSnapshot()
        setLoading(false);
    }, []);

    return (<>
        {loading ? <PostLoadSkeleton /> :
            <PostLayout postsSnapshot={postsSnapshot} />
        }
    </>
    )
}

export default Home