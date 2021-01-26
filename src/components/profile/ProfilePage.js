import React, { useContext, useEffect, useState } from "react"
import { useHistory, Link } from "react-router-dom"
import UserContext from "../context/UserContext"
import { getUser } from "./Api"
import "./profile.css"
import logo from "./octocat.jpg"
import * as HiIcons from "react-icons/hi"
import * as GrIcons from "react-icons/gr"
import * as FaIcons from "react-icons/fa"
import * as IoIcons from "react-icons/io"

function ProfilePage () {
    
    const initialState = {
        bio: "", cell_no: undefined, email: "", fullname: "", 
        hle: "", id: "", location: "", occupation: "", referral_code: "",
    }
    const { userData } = useContext(UserContext);
    const history = useHistory();
    const [userDetails, setUserDetails] = useState(initialState)

    useEffect(() => {
        
        if (! userData.user) 
            return history.push("/login")

        const fetchProfile = async () => {
            let id = userData.user.id
            let token = userData.token
            const details = await getUser(token, id)
            setUserDetails(details)
        }
        fetchProfile();
    }, [history, userData.user, userData.token])

    return (
        <div className="profile-card"> 
        {
            userDetails ? 
            <>
                <img src={ userDetails.img ? userDetails.img : logo } 
                    style= {{
                        boxShadow: "0 2px 7px 0 rgba(0, 0, 0, 0.5)",
                        borderRadius: "50px",
                    }}
                    alt="Profile Img" className="profile-pic" />
                <span><button className="btn"> <HiIcons.HiOutlinePencil /> </button></span>
                <div className="title"> <br/>
                    <h2 style={{ marginLeft: '10%', color: "#0e5996" }}>  {userDetails.fullname} 
                    </h2> 
                </div>
                
                <div className="main-container">
                    <p> <i className="info"> <HiIcons.HiBriefcase/> </i> {userDetails.occupation} </p> <br/>
                    <p> <i className="info"> <GrIcons.GrLocationPin/> </i> {userDetails.location} </p> <br/>
                    <p> <i className="info"> <FaIcons.FaEnvelope/> </i> {userDetails.email} </p> <br/>
                    <p> <i className="info">Bio:</i> {userDetails.bio} </p> <br/>
                    <p> <i className="info"> <GrIcons.GrPhone/> </i> {userDetails.cell_no} </p> <br/>
                    <p> <i className="info"> <IoIcons.IoMdSchool/> </i> {userDetails.hle} </p> <br/>
                    <hr/> <br/>
                    <span><button className="btn" style={{background: "#7fb9e2"}}> <Link to={`/profile/edit/${userDetails.id}`} style={{color: "#fff"}}> Edit Profile </Link></button></span>

                </div>
                <div className="title"> <br/>
                    <h3 style={{ margin: '0 10%', color: "#0e5996" }}> Create a subaccount for content earnings
                    </h3> 
                </div>
            </> : 
            <div>
                Loading...
            </div>
        }
                
        </div>
    )
}

export default ProfilePage;