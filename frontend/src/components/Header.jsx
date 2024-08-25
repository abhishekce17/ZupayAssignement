import React, { useEffect } from "react";
import Logo from "./Logo";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import { useCookies } from "react-cookie";
import { useSetRecoilState } from "recoil";
import { userAtom, userFollowingAtom, userPostsAtom } from "../stores/atoms/user";


export const Header = () => {
    const [cookies, , removeCookies] = useCookies(["authToken"]);
    const navigate = useNavigate();
    const setUser = useSetRecoilState(userAtom);
    const setUsersPost = useSetRecoilState(userPostsAtom)
    const setUsersFollowing = useSetRecoilState(userFollowingAtom);

    const logOut = () => {
        removeCookies("authToken")
        setUser({
            userId: "",
            name: "",
            username: "",
            email: ""
        });
        setUsersPost([]);
        setUsersFollowing([]);
        navigate("/");
    }
    return (
        <div className="flex justify-between p-4 pr-5 pl-5 h-16" >
            <div><Logo /></div>
            <div className="flex gap-5 text-base font-semibold h-8 items-center" >
                {cookies.authToken ?
                    <Button>
                        <button onClick={logOut} >Log out</button>
                    </Button>
                    :
                    <>
                        <Link to="/login" className="text-custom-light-gray" >Login</Link>
                        <Button>
                            <Link to="/register" >Join Now</Link>
                        </Button>
                    </>
                }
            </div>
        </div>
    )
}