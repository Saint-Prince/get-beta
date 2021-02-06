import React, { useContext, useEffect, useState } from "react"
import { useHistory, useRouteMatch } from "react-router-dom"
import UserContext from "../context/UserContext"
import "./view.css"
import logo from "../profile/pic-img.jpeg"
import { getContent, enrollContent } from "./Api"
import { getUser } from "../profile/Api"

function ContentEnroll () {

    const { userData } = useContext(UserContext);
    const history = useHistory();
    const match = useRouteMatch()
    const [contentDetails, setContentDetails] = useState({})
    const [userDetails, setUserDetails] = useState({})

    useEffect(() => {
        
        if (! userData.user) 
            return history.push("/login")

        const fetchContent = async () => {
            let content_id = match.params.id
            let token = userData.token
            const details = await getContent(token, content_id)
            setContentDetails(details.content)
        }
        const fetchProfile = async () => {
            let id = userData.user.id
            let token = userData.token
            const user = await getUser(token, id)
            setUserDetails(user)
        } 

        fetchProfile();
        fetchContent();
        
    }, [history, userData.user, userData.token, match.params.id ])

    const enroll = async () => {
        // let token = userData.token; token, 
        let id = userDetails.id
        let content_id = contentDetails._id
        await enrollContent(id, content_id)
        history.push(`/contents/view/${contentDetails._id}`)        
    }

    return (
        <div className="view">
            {
                contentDetails ?
                <div className="details">
                    <div className="big-img">
                        <img src={logo} alt=""/>
                    </div>  

                    <div className="box">
                        <div className="row">
                            <h2> Enroll to {contentDetails.title} </h2>
                            <span> {contentDetails.type === "free" ? "Free" : contentDetails.price} </span>
                        </div>

                        <p> {contentDetails.descrp} </p>
                        <p>Tags: 
                            <span style={{
                                    background: "#e9eade",
                                    color: "#484444"
                                }}
                            > {contentDetails.tag} </span>  
                        </p>
                        
                        <p> Created At: { contentDetails.createdAt ? contentDetails.createdAt.substr(0, 10) : null }</p>
                        <p> Last Updated: { contentDetails.updatedAt ? contentDetails.updatedAt.substr(0, 10) : null }</p>
                        
                        <button className="cart" style=
                            {{
                                padding: "10px",
                                background: "rgb(101 138 222)",
                                marginLeft: "23%",
                                width: "170px",
                                fontSize: "18px"
                            }}
                            onClick={enroll}
                        >
                            Enroll
                        </button>

                        </div> 
                    </div>
                : <div>Loading...</div>
            }
            
        </div> 
    )

}

export default ContentEnroll;