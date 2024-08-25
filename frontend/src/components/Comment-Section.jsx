import React from 'react'
import TagLayout from './TagLayout'

export default function CommentSection({ postComments }) {
    return (
        <div className="mt-5 flex flex-col gap-4" >{
            postComments.map((comment, index) => {
                return (
                    <div key={comment._id} >
                        <TagLayout>
                            <div className='text-sm' >@{comment?.username}</div>
                        </TagLayout>
                        <div className="pl-2" >{comment?.comment}</div>
                    </div>)
            })
        }</div>
    )
}
