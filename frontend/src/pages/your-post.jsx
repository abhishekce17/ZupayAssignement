import React, { useEffect } from 'react'
import AllPostLayout from '../components/AllPostLayout'
import Card from '../components/Card'
import EditLogo from '../components/Edit-Logo'
import DeleteLogo from '../components/DeleteLogo'
import AddLogo from '../components/Add-Logo'
import TagLayout from '../components/TagLayout'
import { Link } from 'react-router-dom'

export default function YourPost() {
    console.log("rendered")

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
            <AllPostLayout>
                {
                    [...Array(5)].map((v, i) => {
                        return (
                            <Card
                                key={i}
                                href="/following"
                                src="https://images.unsplash.com/photo-1719937050792-a6a15d899281?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                title="Some Random ass catchy title to read this blog, just read it you fuking idiot"
                                time="12:55"
                                date="12/12/12"
                                editIcon={<EditButton id={i} />}
                                deleteIcon={<DeleteButton id={i} />}
                            />
                        )
                    })
                }
            </AllPostLayout>
            <Link to="add-post" className=" bg-primary h-max p-3 rounded-xl absolute bottom-24 md:bottom-12 right-6">
                <AddLogo fillColor={"#ffffff"} />
            </Link>
        </div>
    )
}
