import React from 'react'
import TagLayout from './TagLayout'

export default function PostContent({ postContent, title, author, follow, alreadyFollowing }) {

    return (
        <div>
            <div className="md:text-4xl text-3xl font-bold mb-5" >{title}</div>
            <div className='flex flex-row gap-4 mb-3' >
                <label>@{author}</label>
                <TagLayout>
                    <button disabled={alreadyFollowing} onClick={() => follow()} className="text-sm" >
                        {
                            alreadyFollowing ? "Following" : "Follow"
                        }
                    </button>
                </TagLayout>
            </div>
            <div dangerouslySetInnerHTML={{ __html: postContent }} ></div>
        </div>
    )
}
