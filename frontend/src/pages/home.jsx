import React, { useEffect, useState } from 'react'
import { notify } from '../utils/notify';
import PostLayout from '../components/Post-Layout';

function Home() {
    const [postsSnapshot, setPostSnapshot] = useState([]);

    useEffect(() => {
        const fetchPostsSnapshot = async () => {
            const request = await fetch(`http://localhost:5000/api/v1/post`, {
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
    }, []);

    return (
        <PostLayout postsSnapshot={postsSnapshot} />
    )
}

export default Home