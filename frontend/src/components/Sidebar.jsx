import React, { useEffect, useState } from "react"
import HomeLogo from "./Home-Logo"
import { SearchLogo } from "./Search-Logo"
import { FollowingLogo } from "./Following-Logo"
import { AddEditlogo } from "./Add-Edit-logo"
import { SettingLogo } from "./Setting-Logo"
import { Link, useLocation } from "react-router-dom"
const iconColor = "#3D404B"
const selectedIconColor = "#ffffff"

const Sidebar = () => {
    const location = useLocation();

    const tabSelection = (tab, selectionColor, defaultColor) => location.pathname.split("/")[1] === tab ? selectionColor : defaultColor;

    return (
        <div className="options p-3">
            <ul className="options-list flex justify-between md:block">
                <li className={`option-home h-9 w-9 md:mb-2 rounded-xl flex justify-center items-center ${tabSelection("", "bg-primary", "bg-white")}`} >
                    <Link className="" to="/" >
                        <HomeLogo fillColor={tabSelection("", selectedIconColor, iconColor)} />
                    </Link>
                </li>
                <li className={`option-search h-9 w-9 md:mb-2 rounded-xl flex justify-center items-center ${tabSelection("search", "bg-primary", "bg-white")}`} >
                    <Link to="/search" >
                        <SearchLogo fillColor={tabSelection("search", selectedIconColor, iconColor)} />
                    </Link>
                </li>
                <li className={`option-following h-9 w-9 md:mb-2 rounded-xl flex justify-center items-center ${tabSelection("following", "bg-primary", "bg-white")}`} >
                    <Link to="/following" >
                        <FollowingLogo fillColor={tabSelection("following", selectedIconColor, iconColor)} />
                    </Link>
                </li>
                <li className={`option-add-edit-post h-9 w-9 md:mb-2 rounded-xl flex justify-center items-center ${tabSelection("your-post", "bg-primary", "bg-white")}`} >
                    <Link to="/your-post" >
                        <AddEditlogo fillColor={tabSelection("your-post", selectedIconColor, iconColor)} />
                    </Link>
                </li>
                <li className={`option-profile h-9 w-9 md:mb-2 rounded-xl flex justify-center items-center ${tabSelection("profile", "bg-primary", "bg-white")}`} >
                    <Link to="/profile" >
                        <SettingLogo fillColor={tabSelection("profile", selectedIconColor, iconColor)} />
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default Sidebar