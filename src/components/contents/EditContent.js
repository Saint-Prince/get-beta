import React, { useState, useEffect, useContext } from "react"
import { useHistory, useRouteMatch } from "react-router-dom"
import UserContext from "../context/UserContext"
import { getContent, updateContent } from "./Api"
import { EditContentForm } from "./EditContentForm"
import "../Auth/auth.css" 

export default function EditContent () {

    const [contentDetails, setContentDetails] = useState()
    
    const { userData } = useContext(UserContext);
    const history = useHistory();
    const match = useRouteMatch()

    useEffect(() => {
        
        if (! userData.user) 
            return history.push("/login")

        const fetchContent = async () => {
            let token = userData.token
            const details = await getContent(token, match.params.id)
            
            setContentDetails(details.content)
        }
        fetchContent();
    }, [history, userData.user, userData.token, match.params.id])

    const onSubmit = async (data) => {
        let token = userData.token
        await updateContent(token, match.params.id, data)
        history.push("/myContents")
    }

    return (
        <>
            {
                contentDetails ? <EditContentForm contentDetails={contentDetails} onSubmit={onSubmit} /> : <div> Loading... </div>
            }
        </>
    )
}