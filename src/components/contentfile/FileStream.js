import React, { useContext, useEffect, useState } from "react"
import { useHistory, useRouteMatch } from "react-router-dom"
import UserContext from "../context/UserContext"
// import logo from "../profile/pic-img.jpeg", Link
import "../contents/view.css"
import {  getContentFile } from "./Api"
// import { getUser } from "../profile/Api"getContent, deleteContent,

export default function FileStream () {

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

    let size;
    if (fileDetails.storageUsed  <= 999999) {
        size = Math.round(fileDetails.storageUsed / 1000)+ " kb"
    } else if (fileDetails.storageUsed  <= 999999999 ) {
        size = Math.round(fileDetails.storageUsed / 1000000)+ " mb"
    } else {
        size = Math.round(fileDetails.storageUsed / 1000000000) + " gb"
    }

    return (

        <div className="details">
            <div className="box">
                <div className="row">
                    <h2>{ fileDetails.descrp ? fileDetails.descrp : "No Description" }</h2>
                </div>
                <button 
                    className="cart" style={{background: "rgb(100 165 245)", marginLeft: "66%", fontSize: "18px"}}>
                    Preview
                </button> 
                <p> <b>File Name: </b> {fileDetails.filename}  </p>
                <p> <b>File Type: </b> {fileDetails.mimetype} </p>
                <p> <b>Created At: </b> { fileDetails.dateCreated ? fileDetails.dateCreated.substr(0, 10) : null} </p>
                <p> <b>Size: </b> { size } </p>
                {
                    fileDetails.contentId === userData.user.id ?
                    <div>
                        <button
                            className="cart" style={{background: "#f56464"}}>
                            Delete
                        </button> 
                        <button className="cart" style={{marginLeft: "60px"}}>Edit Description</button>
                        <br/> <br/>
                        </div> : 
                        null 
                    }
            </div>
        </div>
    )
}