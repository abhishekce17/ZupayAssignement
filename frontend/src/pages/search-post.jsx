import React, { useState } from 'react'
import PostLayout from '../components/Post-Layout'
import { notify } from '../utils/notify';

export default function SearchPost() {
    const [searchQuery, setSearchQuery] = useState("");
    const [postsSnapshot, setPostSnapshot] = useState([]);
    const handleSubmitForm = async (e) => {
        e.preventDefault();
        const request = await fetch(`https://zupay-assignement-backend.vercel.app/api/v1/post/search?title=${searchQuery}`, {
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

    return (
        <div>
            <form onSubmit={handleSubmitForm} className='searchbar flex justify-center bg-white md:ml-4 md:mr-4 mb-6 p-1'>
                <input name='title' id='email' type="search" onChange={(e) => setSearchQuery(e.target.value)} className="outline-none rounded w-full text-lg" placeholder='search here ...' required />
            </form>
            <PostLayout postsSnapshot={postsSnapshot} />
        </div>
    )
}
