import React, { useContext, useEffect, useState } from "react"
import { useHistory, useRouteMatch, Link } from "react-router-dom"
import UserContext from "../context/UserContext"
import logo from "../profile/pic-img.jpeg"
import "./view.css"
import { getContent, deleteContent } from "./Api"
import { getUser } from "../profile/Api"

function ContentView () {

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
    }, [history, userData.user, userData.token, match.params.id])

    const removeContent = async (content_id) => {
        let choice = prompt("Please confirm content title to delete", `${contentDetails.title}`)
        if (choice === contentDetails.title) {
            let token = userData.token;
            await deleteContent(token, content_id, match.params.id )
            history.push("/myContents")
        }
    }

    return (
        
        <div className="view">
            {
                contentDetails ?
                <>
                <div className="details">
                    <div className="big-img">
                        <img src={logo} alt=""/>
                    </div>  

                    <div className="box">
                        <div className="row">
                            <h2> {contentDetails.title} </h2>
                            <span> {contentDetails.type === "free" ? "Free" : contentDetails.price} </span>
                        </div>

                        <p> {contentDetails.descrp} </p>
                        <p>Tags:  {contentDetails.tag} </p>
                        <p> Created At: { contentDetails.createdAt ? contentDetails.createdAt.substr(0, 10) : null }</p>

                        {
                            contentDetails.vendorId === userDetails.id ?
                            <div>
                                <button className="cart" style={{background: "#7fb9e2"}}>
                                    <Link to={`/contents/edit/${contentDetails._id}`} style={{textDecoration: "none", color: "#fff"}}>
                                        Edit
                                    </Link>
                                </button> 
                                <button onClick={() => removeContent(contentDetails._id)}
                                    className="cart" style={{background: "#f56464", marginLeft: "40%"}}>
                                    Delete
                                </button> 
                                <button className="cart" style={{background: "#7fb9e2"}}>
                                    <Link to={`/contents/newFile/${contentDetails._id}`} style={{textDecoration: "none", color: "#fff"}}>
                                        Add File
                                    </Link>
                                </button> 
                                <button className="cart" style={{marginLeft: "60px"}}>Edit Cover Image</button>
                                <br/> <br/>
                                </div> : 
                                null 
                            }
                            <>  <br/> <br/> </>
                            <hr/>
                        </div> 
                    </div>
                    <div style={{marginLeft: "5%"}}>
                    <h2 >Files</h2>
                        <ul>
                            <li>
                                <span className="number"> 1</span>
                                <span className="name"> John</span>
                                <span className="points"> 78</span>
                                <span className="badge"> 2121</span>
                            </li>
                            <li>
                                <span className="number"> 2</span>
                                <span className="name"> John</span>
                                <span className="points"> 78</span>
                                <span className="badge"> 2121</span>
                            </li>
                            <li>
                                <span className="number"> 3</span>
                                <span className="name"> John</span>
                                <span className="points"> 78</span>
                                <span className="badge"> 2121</span>
                            </li>
                            <li>
                                <span className="number"> 4</span>
                                <span className="name"> John</span>
                                <span className="points"> 78</span>
                                <span className="badge"> 2121</span>
                            </li>
                            <li>
                                <span className="number"> 5</span>
                                <span className="name"> John</span>
                                <span className="points"> 78</span>
                                <span className="badge"> 2121</span>
                            </li>
                        </ul> 
                    </div>
                     
                </>
                : <div>Loading...</div>
            }
            
        </div> 
    )
}

export default ContentView