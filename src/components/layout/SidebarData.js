import React from "react"
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import * as IoIcons from "react-icons/io"
import * as CgIcons from "react-icons/cg"
import * as BiIcons from "react-icons/bi"

export const SidebarData = [
    {
        title: "Home",
        path: "/",
        icon: <AiIcons.AiFillHome />,
        cName: "nav-text"
    },
    {
        title: "Profile",
        path: "/profile",
        icon: <CgIcons.CgProfile />,
        cName: "nav-text"
    },
    {
        title: "Contents",
        path: "/contents",
        icon: <BiIcons.BiBookContent />,
        cName: "nav-text"
    },
    {
        title: "Creators Hub",
        path: "/hub",
        icon: <FaIcons.FaHubspot />,
        cName: "nav-text"
    },
    {
        title: "3rd Party Integrations",
        path: "/integrations",
        icon: <AiIcons.AiOutlineApi />,
        cName: "nav-text"
    },
    {
        title: "Analytics",
        path: "/analytics",
        icon: <IoIcons.IoIosAnalytics />,
        cName: "nav-text"
    },
]