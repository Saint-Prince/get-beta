import React, { useContext, useState, useEffect } from "react"
import { useHistory, useRouteMatch, Link } from "react-router-dom"
import "./view.css"
import { getEnrollers } from "./Api"
import UserContext from "../context/UserContext"

export default function EnrolledUsers () {

    const { userData } = useContext(UserContext);

    const history = useHistory()
    const match = useRouteMatch()
    const [enrollers, setEnrollers] = useState([])

    useEffect(() => {
        
        if (! userData.user) 
            return history.push("/login")

        const fetchContent = async () => {
            let content_id = match.params.id
            let token = userData.token
            const details = await getEnrollers(token, content_id)
            setEnrollers(details.subscribers)
        }

        fetchContent();
        
    }, [history, userData.user, userData.token, match.params.id ])

    return (
        <div style={{ background: "#f1f1f1" }}>
            <h2 style={{ padding: '1rem', color: "#0e5996" }}> Enrolled </h2>

            {
                enrollers ? 
                enrollers.map( (enroller, index) => (

                    <ul key={enroller._id} className="filelist">
                        <li>
                            <span className="number"> {index + 1 + "."}  </span>

                            <Link to={`/profile/view/${enroller.subscriberId}`} >
                                <span className="points" style={{width: "170px"}}>
                                    { enroller.fullname }
                                </span>
                            </Link>    
                            <span className="badge" style={{marginLeft: "25%"}} >
                                { enroller.email } 
                            </span>

                        </li>

                    </ul>
        
                )) : <div> Loading... </div>
            } 
        </div>
    )
}