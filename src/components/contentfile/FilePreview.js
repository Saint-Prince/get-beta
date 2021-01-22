import React, { useContext, useEffect, useState } from "react"
import { useHistory, useRouteMatch } from "react-router-dom"
import UserContext from "../context/UserContext"
import "../contents/view.css"
import {  getContentFile } from "./Api"

export default function FilePreview () {

    const { userData } = useContext(UserContext);
    const history = useHistory();
    const match = useRouteMatch()
    const [fileDetails, setFileDetails] = useState({}) 

    useEffect(() => {
        
        if (! userData.user) 
            return history.push("/login")

        const fetchContentFile = async () => {
            let id = match.params.id
            let token = userData.token
            const details = await getContentFile(token, id)
            setFileDetails(details.contentfile)
        }
        fetchContentFile();
    }, [history, userData.user, userData.token, match.params.id])

    return (

        <div style={{padding: "30px 0"}}>
            {
                fileDetails ?
                <div className="box">
                    {
                        fileDetails.mimetype === "application/pdf" || "application/msword" ||
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ?
                        <embed src={fileDetails.url} type={fileDetails.mimetype} width="100%" height="600px"> 
                        </embed> :
                        // <a href={`/${fileDetails.url}`}>
                        //     Click Here
                        // </a>: 
                        fileDetails.mimetype === "audio/mp3" ?
                        <audio controls>
                            <source src={fileDetails.url} type={fileDetails.mimetype}/>
                        </audio> :
                        fileDetails.mimetype === "video/mp4" ?
                        <video controls>
                            <source src={fileDetails.url} type={fileDetails.mimetype} />
                        </video> : 
                        fileDetails.mimetype === "image/jpeg" || "image/jpg" || "image/png" ?
                        <img src={fileDetails.url} alt={fileDetails.filename} style={{ 
                            backgroundSize: "contain", width: "100%" 
                        }} />
                        : <h2> "File format not supported" </h2> 
                    }
                </div> : <div> Loading... </div>
            }
            
        </div>
    )
}