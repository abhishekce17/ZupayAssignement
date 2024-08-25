import React from 'react'
import { Editor } from '../components/Editor'
import { RedirecToLogin } from '../components/Authorization'

export default function AddPost() {
    return (
        <RedirecToLogin>
            <div className="h-full" >
                <Editor placeholder={'Write something...'} />
            </div>
        </RedirecToLogin>
    )
}
