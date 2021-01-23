import React, { useContext, useEffect, useState } from "react"
import { useHistory, useRouteMatch, Link } from "react-router-dom"
import UserContext from "../context/UserContext"
// import logo from "../profile/pic-img.jpeg"
// import * as GrIcons from "react-icons/gr"
import "../contents/view.css"
import {  getContentFile, deleteContentFile } from "./Api"
import { getUser } from "../profile/Api"
// import { getUser } from "../profile/Api"getContent, deleteContent,

export default function FileStream () {

    const { userData } = useContext(UserContext);
    const history = useHistory();
    const match = useRouteMatch()
    const [fileDetails, setFileDetails] = useState({}) 
    const [userDetails, setUserDetails] = useState({}) 

    useEffect(() => {
        
        if (! userData.user) 
            return history.push("/login")

        const fetchContentFile = async () => {
            let id = match.params.id
            let token = userData.token
            const details = await getContentFile(token, id)
            setFileDetails(details.contentfile)
        }
        
        const fetchProfile = async () => {
            let id = userData.user.id
            let token = userData.token
            const user = await getUser(token, id)
            setUserDetails(user)
        }
        
        fetchContentFile();
        fetchProfile();
    }, [history, userData.user, userData.token, match.params.id, fileDetails.contentId])

    let size;
    if (fileDetails.storageUsed  <= 999999) {
        size = Math.round(fileDetails.storageUsed / 1000)+ " kb"
    } else if (fileDetails.storageUsed  <= 999999999 ) {
        size = Math.round(fileDetails.storageUsed / 1000000)+ " mb"
    } else {
        size = Math.round(fileDetails.storageUsed / 1000000000) + " gb"
    }

    const removeContentFile = async (confile_id) => {
        let choice = prompt("Please confirm content title to delete", `${fileDetails.filename}`)
        if (choice === fileDetails.filename) {
            let token = userData.token;
            await deleteContentFile(token, confile_id, match.params.id )
            // history.push(`/contents/view/5ffb89763cc6702e7cbb94f1`)
        }
    }
    // let logo;
    // if (fileDetails.mimetype === "image/jpeg" || "image/jpg" || "image/png" ) {
    //     logo = <GrIcons.GrImage/> 
    // } else if (fileDetails.mimetype === "audio/mp3" || "audio/mpeg" || "video/mp4") {
    //     logo = <GrIcons.GrMultimedia/>
    // } else {
    //     logo = <GrIcons.GrDocumentText/>
    // }
    return (

        <div className="details">
            {
                fileDetails ?
                <div className="box">
                    <div className="row">
                        <h2>{ fileDetails.filename }</h2>
                    </div>
                    <Link to={`/contentfile/preview/${fileDetails._id}`}>
                        <button 
                            className="cart" style={{background: "rgb(100 165 245)", marginLeft: "66%", fontSize: "18px"}}>
                            Preview
                        </button>     
                    </Link>
                     
                    <p> <b>File Type: </b> {fileDetails.mimetype} </p>
                    <p> <b>Created At: </b> { fileDetails.dateCreated ? fileDetails.dateCreated.substr(0, 10) : null} </p>
                    <p> 
                        <b>Size: </b> { size + " "} 
                        {/* { logo } */}
                    </p>
                    {
                        //
                        fileDetails.vendorId === userDetails.id ?
                        <div>
                        <button onClick={() => removeContentFile(fileDetails._id)}
                            className="cart" style={{background: "#f56464"}}>
                            Delete
                        </button>
                        <button className="cart" style={{marginLeft: "60px"}}>Edit Description</button>
                        <br/> <br/>
                        </div> : 
                        null 
                    }
                </div> : <div> Loading... </div>
            }
            
        </div>
    )
}