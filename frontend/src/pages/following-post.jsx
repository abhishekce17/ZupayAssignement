import React from 'react'
import TagLayout from '../components/TagLayout'
import { RedirecToLogin } from '../components/Authorization'
import { useRecoilValue } from 'recoil'
import { userFollowingAtom } from '../stores/atoms/user'

export default function FollowingPost() {
    const userFollowing = useRecoilValue(userFollowingAtom);
    const fetchPosts = () => {

    }
    return (<RedirecToLogin>
        <div>
            <div className='tags flex gap-6 mb-2 overflow-x-scroll no-scrollbar' >
                {
                    userFollowing.map((author, index) => {
                        return (
                            <TagLayout key={author._id} >
                                <button onClick={fetchPosts} >
                                    {author.username}
                                </button>
                            </TagLayout>
                        )
                    })
                }
            </div>
        </div>
    </RedirecToLogin>
    )
}
