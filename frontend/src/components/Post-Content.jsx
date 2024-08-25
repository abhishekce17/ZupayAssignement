import React from 'react'
import TagLayout from './TagLayout'
import { useCookies } from 'react-cookie'

export default function PostContent({ postContent, title, author, follow, alreadyFollowing }) {
    const [cookies] = useCookies(["authToken"]);

    return (
        <div>
            <div className="md:text-4xl text-3xl font-bold mb-5" >{title}</div>
            <div className='flex flex-row gap-4 mb-3' >
                <label>@{author}</label>
                {cookies.authToken ?
                    <TagLayout>
                        <button disabled={alreadyFollowing} onClick={() => follow()} className="text-sm" >
                            {
                                alreadyFollowing ? "Following" : "Follow"
                            }
                        </button>
                    </TagLayout>
                    : undefined}
            </div>
            <div dangerouslySetInnerHTML={{ __html: postContent }} ></div>
        </div>
    )
}
