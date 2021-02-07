import React, { useContext, useEffect, useState } from "react"
import UserContext from "../context/UserContext"
import { useHistory, Link } from "react-router-dom"
import { getEnrolledContents } from "./Api"
import "./contents.css"
import logo from "../profile/pic-img.jpeg"
// import * as BiIcons from "react-icons/bi", Link 
import "../Auth/auth.css"
import Footer from "../../pages/Footer"

function EnrolledContents () {

    const { userData } = useContext(UserContext);
    const history = useHistory();
    const [enrolledContents, setEnrolledContents] = useState([])
    const [search, setSearch] = useState("")
    const [isLoading, setLoading] = useState(false)
    const [filteredContents, setFilteredContents] = useState([]);

    useEffect(() => {
        
        if (! userData.user) 
            return history.push("/login")

        const fetchEnrolledContents = async () => {
            setLoading(true)
            let token = userData.token;
            let id = userData.user.id;
            const details = await getEnrolledContents(token, id)
            setEnrolledContents(details.contents)
            setLoading(false)
        }
        fetchEnrolledContents();
    }, [history, userData.user, userData.token])

    useEffect(() => {
        if (enrolledContents) {
           setFilteredContents(
                enrolledContents.filter( content => {
                    return content.title.toLowerCase().includes( search.toLowerCase() )
                })
            ) 
        }
        
    }, [search, enrolledContents])
    // console.log(enrolledContents)

    return (
        <>
        <div >   
            {
                enrolledContents.length >=1 ? 
                <>
                <input id="find" className="search" 
                    type="search" placeholder="Search Contents" 
                    onChange={ e => setSearch(e.target.value) }
                />  <br/> <br/>

                <p align="right" style={{ marginRight: "3%" }}>
                    
                    <Link style={{ textDecoration: "none", color: "#fff"}} to="/contents/create"> 
                        <button className="btn btn-lg btn-success">
                            Create Content
                        </button>     
                    </Link> 
                </p> 
                </> : null
            } 
            <div className="services">
            {
                isLoading === false ?
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
                )) : isLoading === true ?
                    <div style={{
                                margin: "195px auto",
                                height: "60vh"
                        }}> <br/> 
                            <h3> Loading... </h3> 
                    </div> :   
                    enrolledContents.length < 1 ?
                    <div style={{
                        margin: "195px auto",
                        height: "60vh"
                        }}> <br/> 
                        <h3> You haven't enrolled to any Content </h3> 
                        <br/> 
                        <p align="right" style={{ marginRight: "30%" }}>
                            
                            <Link style={{ textDecoration: "none", color: "#fff"}} to="/explore"> 
                                <button className="btn btn-lg btn-success">
                                    Explore Contents
                                </button>     
                            </Link> 
                        </p> 
                    </div> : null
            }
            </div> <br/>
            
        </div>
        <Footer/>
        </>
    ) 
}

export default EnrolledContents;