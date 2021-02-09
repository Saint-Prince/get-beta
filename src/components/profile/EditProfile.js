import React, { useState, useEffect, useContext } from "react"
import { useHistory, useRouteMatch } from "react-router-dom"
import UserContext from "../context/UserContext"
import { getUser, updateUser } from "./Api"
import { EditForm } from "./EditForm"
import "../Auth/auth.css" 

export default function EditProfile () {

    const [userDetails, setUserDetails] = useState()
    const [isLoading, setLoading] = useState(false)
    
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

    const onSubmit = async (data) => {
        setLoading(true)
        let token = userData.token
        await updateUser(token, match.params.id, data)
        setLoading(false)
        history.push("/profile")
    }

    return (
        <>
            {
                userDetails ? <EditForm userDetails={userDetails} onSubmit={onSubmit} loading={isLoading} /> : 
                <div style={{
                    margin: "195px auto",
                    height: "60vh"
                }}> Loading... </div>
            }
        </>
    )
}