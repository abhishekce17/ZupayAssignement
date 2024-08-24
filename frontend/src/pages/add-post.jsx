import React from 'react'
import { Editor } from '../components/Editor'

export default function AddPost() {
    return (
        <div className="h-full" >
            <Editor placeholder={'Write something...'} />
        </div>
    )
}
