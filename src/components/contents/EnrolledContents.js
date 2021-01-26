import React, { useContext, useEffect, useState } from "react"
import UserContext from "../context/UserContext"
import { useHistory, Link } from "react-router-dom"
import { getEnrolledContents } from "./Api"
import "./contents.css"
import logo from "../profile/pic-img.jpeg"
// import * as BiIcons from "react-icons/bi", Link 
import "../Auth/auth.css"

function EnrolledContents () {

    const { userData } = useContext(UserContext);
    const history = useHistory();
    const [enrolledContents, setEnrolledContents] = useState([])
    const [search, setSearch] = useState("")
    const [filteredContents, setFilteredContents] = useState([]);

    useEffect(() => {
        
        if (! userData.user) 
            return history.push("/login")

        const fetchEnrolledContents = async () => {
            let token = userData.token;
            let id = userData.user.id;
            const details = await getEnrolledContents(token, id)
            setEnrolledContents(details.contents)
            // console.log(contents)
        }
        fetchEnrolledContents();
    }, [history, userData.user, userData.token])

    useEffect(() => {
        setFilteredContents(
            enrolledContents.filter( content => {
                return content.title.toLowerCase().includes( search.toLowerCase() )
            })
        )
    }, [search, enrolledContents])
    // console.log(enrolledContents)

    return (
        <div >   
            <h2 style={{ padding: '1rem', color: "#0e5996" }}> 
                Enrolled  
            </h2>
            <input id="find" className="search" 
                type="search" placeholder="Search Contents" 
                onChange={ e => setSearch(e.target.value) }
            />  <br/> <br/>
            {/* <label htmlFor="sort"> Sort By: </label>
            <select>
                <option value="recent"> Recently Added </option>
                <option value="recent"> Recently </option>
            </select> */}

            <div className="services">
            {
                enrolledContents ?
                filteredContents.map( content => ( 

                    <div key={content._id} className="card">
                        <div style={{ backgroundImage: content.coverImage ? content.coverImage : `url(${logo})` }}
                            className="card-image">
                        </div>
                        <div className="card-text">
                            <span className="date"> { content.createdAt ? content.createdAt.substr(0, 10) : null} </span>
                            <h2> {content.title} </h2> <br/>
                            <p> {content.descrp} </p> <br/>
                        </div>
                        <div className="card-stats">
                            <div className="stat">
                                <div className="value"> {content.contentfiles.length} </div>
                                <div className="text"> { content.contentfiles.length === 1 ? "File": "Files" } </div>
                            </div>
                            <div className="stat border">
                                <div className="value"> {content.type === "free" ? "free" : content.price} </div> <hr style={{width: "80px"}} />
                                <div className="text"> {content.format} </div>
                                {/* {content.type === "paid" ? `${content.subscriberids.length} enrolled` : "share"} */}
                            </div>
                            <Link to={`/contents/view/${content._id}`} style={{ textDecoration: "none" }}>                               
                                <div className="stat">
                                    <div className="text" 
                                        style={{ marginTop: "10px", fontSize: "22px" }} >
                                        <span style={{ fontSize: "1.60rem" }} >&rarr;</span>
                                    </div>
                                    {/* <div className="value">32</div> */}
                                </div>  
                            </Link>
                        </div>      
                    </div>
                )) : <div> <h2> You haven't enrolled to any content </h2> </div>
            }
            </div>
            
        </div>
    ) 
}

export default EnrolledContents;