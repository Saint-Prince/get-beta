import React, { useContext, useState, useEffect } from "react"
import UserContext from "../context/UserContext"
import { Link, useHistory } from "react-router-dom"
import "./contents.css"
import * as FaIcons from "react-icons/fa"
import * as GiIcons from "react-icons/gi"
import * as BiIcons from "react-icons/bi"
import Footer from "../../pages/Footer"
import { getUserProfile } from "../profile/Api"


function Content () {

    const { userData } = useContext(UserContext)
    const history = useHistory()
    const [userDetails, setUserDetails] = useState({})

    useEffect(() => {

        if (! userData.user) 
            return history.push("/login")

        const fetchProfile = async () => {
            let id = userData.user.id
            let token = userData.token
            const details = await getUserProfile(token, id)
            setUserDetails(details)
        }
        fetchProfile();
    }, [history, userData.user, userData.token ])

    return (
        <>
        <div className="contents">
            <h1> Let's Increase our Productivity </h1>
            <div className="services">
                <div className="content content-explore">
                    <FaIcons.FaWpexplorer className="fab explorer" />
                    <h2 className="card-header">Explore Contents</h2>
                    <p className="card-text">
                        Betarians have something in store for us. <br/> Like to check it out ? 
                    </p>
                    <Link to="/explore" className="card-btn">
                        Let's Go <span> &rarr; </span>
                    </Link>
                </div>
                <div className="content my-contents">
                    <BiIcons.BiBookContent className="fab my-content" />
                    <h2 className="card-header">My Contents</h2>
                    <p className="card-text">
                        Okay, let's take a look at what we have so far
                    </p>
                    <Link to={`/profile/myContents/${userDetails.id}`} className="card-btn">
                        Yes <span> &rarr; </span>
                    </Link>
                </div>
                
                <div className="content enrolled">
                    <GiIcons.GiPencil className="fab enroll" />
                    <h2 className="card-header">Enrolled Contents</h2>
                    <p className="card-text">
                        What have we here for ourselves 
                    </p>
                    <Link to="/contents/enrolled" className="card-btn">
                        View <span> &rarr; </span>
                    </Link>
                </div>
            </div>
            
        </div>
            <Footer/>
        </>
    )
}

export default Content;