import React, { useContext, useEffect, useState } from "react"
import UserContext from "../context/UserContext"
import { useHistory, Link } from "react-router-dom"
import { getContents } from "./Api"
import "./contents.css"
import logo from "../profile/pic-img.jpeg"
// import * as BiIcons from "react-icons/bi", Link 
import "../Auth/auth.css"
// import "bootstrap/dist/css/bootstrap.css"

function MyContents () {

    const { userData } = useContext(UserContext);
    const history = useHistory();
    const [contents, setContents] = useState([])
    const [search, setSearch] = useState("")
    const [filteredContents, setFilteredContents] = useState([]);

    useEffect(() => {
        
        if (! userData.user) 
            return history.push("/login")

        const fetchContents = async () => {
            let token = userData.token
            const details = await getContents(token)
            setContents(details.myContents)
            // console.log(contents)
        }
        fetchContents();
    }, [history, userData.user, userData.token])

    useEffect(() => {
        setFilteredContents(
            contents.filter( content => {
                return content.title.toLowerCase().includes( search.toLowerCase() )
            })
        )
    }, [search, contents])

    return (
        <div >    
            <input id="find" className="search" 
                type="search" placeholder="Search Contents" 
                onChange={ e => setSearch(e.target.value) }
            />  <br/> <br/>
            {/* <label htmlFor="sort"> Sort By: </label>
            <select>
                <option value="recent"> Recently Added </option>
                <option value="recent"> Recently </option>
            </select> */}
            <p align="right" style={{ marginRight: "3%" }}>
                 
                <Link style={{ textDecoration: "none", color: "#fff"}} to="/contents/create"> 
                    <button className="btn btn-lg btn-success">
                        Create Content
                    </button>     
                </Link> 
            </p> 
            <div className="services">
            {
                contents ?
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
                )) : <div> <h2> You haven't created any content </h2> </div>
            }
            </div>
            
        </div>
    ) 
}

export default MyContents;