import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import UserContext from "../context/UserContext"
import { getUser } from "./Api"
import "./profile.css"

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
        <div className="card-container">
            <span className="pro"> PRO </span>
            <img
                className="round"
                alt="user" 
            />
            <h1> Profile Page </h1>
            <h2> {userDetails.fullname} </h2>
            <h3> {userDetails.email} </h3>
            <h3> {userDetails.bio} </h3>
            <h3> {userDetails.cell_no} </h3>
            <h3> {userDetails.hle} </h3>
            <h3> {userDetails.occupation} </h3>
            <h3> {userDetails.location} </h3>

        </div>
    )
}

export default ProfilePage;