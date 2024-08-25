import React, { useState } from 'react'
import Button from './Button';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../stores/atoms/user';


export default function CommentInput({ addComment }) {
    const [comment, setComment] = useState("");
    const userInfo = useRecoilValue(userAtom);
    return (
        <>
            {
                userInfo.userId !== "" ?
                    <div className='flex flex-col gap-1' >
                        <label htmlFor='email' className='font-bold text-lg mt-5' >Comments</label>
                        <div className='flex flex-row' >
                            <input onChange={(e) => setComment(e.target.value)} name='email' id='email' type="email" value={comment} className="bg-custom-lightest-gray outline-none p-1 rounded flex-grow mr-3" required />
                            <Button>
                                <button onClick={() => { addComment(comment); setComment("") }} >
                                    Add
                                </button>
                            </Button>
                        </div>
                    </div>
                    :
                    undefined
            }
        </>
    )
}
