import React from 'react'
import AllPostLayout from './AllPostLayout'
import Card from './Card'

export default function PostLayout({ postsSnapshot, editIcon, deleteIcon }) {
    return (
        <AllPostLayout>{
            postsSnapshot.map((value, index) => {
                return (
                    <Card
                        key={value._id}
                        href={`/post/${value._id}`}
                        src={value.firstImgLink}
                        title={value.title}
                        time="12:55"
                        date="12/12/12"
                        editIcon={editIcon}
                        deleteIcon={deleteIcon}
                    />
                )
            })
        }
        </AllPostLayout>
    )
}
