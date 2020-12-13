import React, { useState, useEffect, useContext } from "react"
import { useHistory, useRouteMatch } from "react-router-dom"
import UserContext from "../context/UserContext"
import { getUser } from "./Api"
import { EditForm } from "./EditForm"
import "../Auth/auth.css"

export default function EditProfile () {

    const [userDetails, setUserDetails] = useState()
    
    const { userData } = useContext(UserContext);
    const history = useHistory();
    const match = useRouteMatch()

    useEffect(() => {
        
        if (! userData.user) 
            return history.push("/login")

        const fetchProfile = async () => {
            let token = userData.token
            const details = await getUser(token, match.params.id)
            
            setUserDetails(details)
        }
        fetchProfile();
    }, [history, userData.user, userData.token, match.params.id])

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(e)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            {
                userDetails ? <EditForm userDetails={userDetails} onSubmit={onSubmit} /> : <div> Loading... </div>
            }
        </div>
    )
}