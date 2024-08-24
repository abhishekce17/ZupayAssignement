import React from "react";
import Logo from "./Logo";
import { Link } from "react-router-dom";
import Button from "./Button";

export const Header = () => {
    return (
        <div className="flex justify-between p-4 pr-5 pl-5 h-16" >
            <div><Logo /></div>
            <div className="flex gap-5 text-base font-semibold h-8 items-center" >
                <Link to="/login" className="text-custom-light-gray" >Login</Link>
                <Button>
                    <Link to="/register" >Join Now</Link>
                </Button>
            </div>
        </div>
    )
}