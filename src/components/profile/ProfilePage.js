import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import UserContext from "../context/UserContext"

function ProfilePage () {
    
    const { userData } = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        if (! userData.user) history.push("/login")
    })

    return (
        <div className="profile">
            <h1>Profile Page</h1>
        </div>
    )
}

export default ProfilePage;