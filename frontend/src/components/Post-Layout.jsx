import React from 'react'
import AllPostLayout from './AllPostLayout'
import Card from './Card'
import { useRecoilValue } from 'recoil'
import { userPostsAtom } from '../stores/atoms/user'
import { Link } from 'react-router-dom'
import TagLayout from './TagLayout'
import { notify } from '../utils/notify'
import { useCookies } from 'react-cookie'

export default function PostLayout({ postsSnapshot, editIcon, deleteIcon }) {

    const userPostsInfo = useRecoilValue(userPostsAtom);
    const [cookies] = useCookies(["authToken"]);

    const EditButton = ({ postId }) => {
        return (
            <Link to={`edit-post/${postId}`} >
                {/* <EditLogo fillColor="#3D404B" /> */}
                <TagLayout>
                    Edit
                </TagLayout>
            </Link>
        )
    }

    const DeleteButton = ({ postId }) => {
        const deletePost = async () => {
            const request = await fetch(`https://zupay-assignement-backend.vercel.app/api/v1/post/${postId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${cookies.authToken}`
                }
            })
            if (request.status === 200) {
                notify("Post is deleted", "success");
            } else {
                const { error } = await request.json();
                notify(error, "error");
            }
        }

        return (
            <button onClick={deletePost} >
                {/* <DeleteLogo fillColor="#3D404B" /> */}
                <TagLayout>
                    Delete
                </TagLayout>
            </button>
        )
    }


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
                        editIcon={editIcon && userPostsInfo.includes(value._id) ? <EditButton postId={value._id} /> : undefined}
                        deleteIcon={deleteIcon && userPostsInfo.includes(value._id) ? <DeleteButton postId={value._id} /> : undefined}
                    />
                )
            })
        }
        </AllPostLayout>
    )
}
