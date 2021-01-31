import React, { useContext, useEffect, useState } from "react"
import { useHistory, useRouteMatch } from "react-router-dom"
import UserContext from "../context/UserContext"
import { getUserProfile } from "./Api"
import "./profile.css"
import logo from "./octocat.jpg"
import * as HiIcons from "react-icons/hi"
import * as GrIcons from "react-icons/gr"
import * as FaIcons from "react-icons/fa"
import * as IoIcons from "react-icons/io"

function ViewProfile () {
    
    const initialState = {
        bio: "", cell_no: undefined, email: "", fullname: "", 
        hle: "", id: "", location: "", occupation: "", referral_code: "",
    }
    const { userData } = useContext(UserContext);
    const history = useHistory();
    const match = useRouteMatch()
    const [userDetails, setUserDetails] = useState(initialState)

    useEffect(() => {
        
        if (! userData.user) 
            return history.push("/login")

        const fetchProfile = async () => {
            let id = match.params.id
            let token = userData.token
            const details = await getUserProfile(token, id)
            setUserDetails(details)
        }
        fetchProfile();
    }, [history, userData.user, userData.token, match.params.id])

    return (
        <div className="profile-card" > 
        {
            userDetails ? 
            <>
                <img src={ userDetails.img ? userDetails.img : logo } 
                    style= {{
                        boxShadow: "0 2px 7px 0 rgba(0, 0, 0, 0.5)",
                        borderRadius: "50px",
                    }}
                    alt="Profile Img" className="profile-pic" />
                <div className="title"> <br/>
                    <h2 style={{ marginLeft: '10%', color: "#0e5996" }}>  {userDetails.fullname} 
                    </h2> 
                </div>
                
                <div className="main-container">
                    <p> <i className="info"> <HiIcons.HiBriefcase/> </i> {userDetails.occupation} </p> <br/>
                    { userDetails.location ? <p> <i className="info"> <GrIcons.GrLocationPin/> </i> {userDetails.location} </p> : null}<br/>
                    <p> <i className="info"> <FaIcons.FaEnvelope/> </i> {userDetails.email} </p> <br/>
                    { userDetails.gender ? <p> <i className="info"> <FaIcons.FaGenderless/> </i> {userDetails.gender} </p> : null }<br/>
                    <p> <i className="info">Bio:</i> {userDetails.bio} </p> <br/>
                    { userDetails.cell_no ? <p> <i className="info"> <GrIcons.GrPhone/> </i> {userDetails.cell_no} </p> : null }<br/>
                    { userDetails.hle ? <p> <i className="info"> <IoIcons.IoMdSchool/> </i> {userDetails.hle} </p> : null }<br/>
                    <p className="media">
                    
                        <span>
                            { userDetails.twitter ? <a href={userDetails.twitter} style={{color: "#00b8ff"}}> <FaIcons.FaTwitter/> </a> : null }
                        </span>
                        <span>
                            { userDetails.instagram ?  <a href={userDetails.instagram} style={{color: "#E1306C"}}> <FaIcons.FaInstagram/> </a> : null }
                        </span>    
                        <span>
                            { userDetails.linkedIn ? <a href={userDetails.linkedIn} style={{color: "#5b95dc"}}> <FaIcons.FaLinkedin/> </a> : null }
                        </span>    
                        <span>
                            {userDetails.facebook ? <a href={userDetails.facebook} style={{color: "#004eff"}}> <FaIcons.FaFacebook/> </a> : null}
                        </span>        
                    </p>
                </div><hr/> <br/>
            </> : 
            <div>
                Loading...
            </div>
        }
                
        </div>
    )
}

export default ViewProfile;