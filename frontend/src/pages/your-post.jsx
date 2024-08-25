import React, { useEffect, useState } from 'react'
import AddLogo from '../components/Add-Logo'
import TagLayout from '../components/TagLayout'
import { Link } from 'react-router-dom'
import PostLayout from '../components/Post-Layout'
import { notify } from '../utils/notify'
import { useRecoilValue } from 'recoil'
import { userAtom } from '../stores/atoms/user'

export default function YourPost() {
    const [postsSnapshot, setPostSnapshot] = useState([]);
    const userInfo = useRecoilValue(userAtom);

    useEffect(() => {
        const fetchPostsSnapshot = async () => {
            const request = await fetch(`http://localhost:5000/api/v1/post/author/${userInfo.userId}`, {
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
        fetchPostsSnapshot()
    }, []);

    const EditButton = ({ id }) => {
        const editPost = () => {
            console.log("Editing");
        }
        return (
            <button onClick={editPost} >
                {/* <EditLogo fillColor="#3D404B" /> */}
                <TagLayout>
                    Edit
                </TagLayout>
            </button>
        )
    }

    const DeleteButton = ({ id }) => {
        const deletePost = () => {
            console.log("Deleting");
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
        <div>
            <PostLayout postsSnapshot={postsSnapshot} editIcon={<EditButton />} deleteIcon={<DeleteButton />} />
            <Link to="add-post" className=" bg-primary h-max p-3 rounded-xl absolute bottom-24 md:bottom-12 right-6">
                <AddLogo fillColor={"#ffffff"} />
            </Link>
        </div>
    )
}
