import React, { useContext, useEffect, useState } from "react"
import UserContext from "../context/UserContext"
import { useHistory, Link } from "react-router-dom"
import { getAllContents } from "./Api"
import "./contents.css"
import logo from "../profile/pic-img.jpeg"
// import * as BiIcons from "react-icons/bi", Link 
import Loading from "./Loading"
import "../Auth/auth.css"
import Footer from "../../pages/Footer"

function AllContents () {

    const { userData } = useContext(UserContext);
    const history = useHistory();
    const [contents, setContents] = useState([])
    const [isLoading, setLoading] = useState(false)
    const [visible, setVisible] = useState(9)
    const [search, setSearch] = useState("")
    const [sort, setSort] = useState("")
    const [filteredContents, setFilteredContents] = useState([]);

    //dynamic sorting

    useEffect(() => {
        
        if (! userData.user) 
            return history.push("/login")

        const fetchContents = async () => {
            setLoading(true)
            let token = userData.token

            const details = await getAllContents(token)
            setContents(details.contents)
            setLoading(false)
        }
        fetchContents();
    }, [history, userData.user, userData.token])

    useEffect(() => {
        if (contents) {
            if (sort === "Free") {

                let freeContents = contents.filter( content => (
                    content.type.toLowerCase().includes( "free" )
                ))
                setFilteredContents(
                    freeContents.filter( content => {
                        return content.title.toLowerCase().includes( search.toLowerCase() )
                    })
                ) 

            } else if (sort === "Random") {
    
                let randContents = contents.sort( (a, b) => (
                    0.5 - Math.random()
                ))
                setFilteredContents(
                    randContents.filter( content => {
                        return content.title.toLowerCase().includes( search.toLowerCase() )
                    })
                ) 
                
            } else if (sort === "Recent") {
                contents.sort()
                contents.reverse()
                setFilteredContents(
                    contents.filter( content => {
                        return content.title.toLowerCase().includes( search.toLowerCase() )
                    })
                ) 
            }
            else if (sort === "Paid") {
                
                let freeContents = contents.filter( content => (
                    content.type.toLowerCase().includes( "paid" )
                ))
                setFilteredContents(
                    freeContents.filter( content => {
                        return content.title.toLowerCase().includes( search.toLowerCase() )
                    })
                ) 
                
            } else if (sort === "Media") {
                let mediaContents = contents.filter( content => (
                    content.format.toLowerCase().includes( "media" )
                ))
                setFilteredContents(
                    mediaContents.filter( content => {
                        return content.title.toLowerCase().includes( search.toLowerCase() )
                    })
                ) 
            } else if (sort === "Document") {
                let docContents = contents.filter( content => (
                    content.format.toLowerCase().includes( "document" )
                ))
                setFilteredContents(
                    docContents.filter( content => {
                        return content.title.toLowerCase().includes( search.toLowerCase() )
                    })
                ) 
            } else {
                setFilteredContents(
                    contents.filter( content => {
                        return content.title.toLowerCase().includes( search.toLowerCase() )
                    })
                ) 
            }
            
        }
        
    }, [search, contents, sort])

    let maxContentLength = contents.length;
    
    const showMoreItems = () => {
        setVisible(prevState => prevState + 3 )
    }

    return (
        <div >   
            {
                contents.length >= 1 ? 
                <>
                <input id="find" className="search" 
                    type="search" placeholder="Search Contents" 
                    onChange={ e => setSearch(e.target.value) }
                />  <br/> <br/>
                <select 
                    style = {{
                        outline: "none",
                        padding: "5px",
                        borderRadius: "15px",
                        marginLeft: "7%",
                        background: "#f0f8ff",
                        color: "#333"
                    }}
                    onChange={ e => setSort(e.target.value) }
                > 
                    <option disabled> Sort By: </option>
                    <option value="Random">Random</option>
                    <option value="Recent">Recent</option>
                    <option value="Media">Media</option>
                    <option value="Document">Document</option>
                    <option value="Paid">Paid</option>
                    <option value="Free">Free</option>
                </select>
                </> : null
            }  
            <div className="services">
            {   
                isLoading ? <Loading/> :
                filteredContents.length < 1 ?
                <div style={{
                    margin: "150px auto",
                    height: "30vh"
                }}> <br/> 
                    <h3> No content available </h3> 
                    <br/> 
                    <p align="right" style={{ marginRight: "30%" }}>
                        
                        <Link style={{ textDecoration: "none", color: "#fff"}} to="/contents/create"> 
                            <button className="btn btn-lg btn-success">
                                Create Content
                            </button>     
                        </Link> 
                    </p> 
                </div> :
                !isLoading ?
                filteredContents.slice(0, visible).map( content => ( 
                    <div key={content._id} className="card">
                        <div style={{ backgroundImage: content.coverImage ? `url(${content.coverImage})` : `url(${logo})` }}
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
                )) :  null
            }
            {
                visible <= maxContentLength ?
                <button className="btn btn-lg btn-success"  onClick={showMoreItems}>
                    Load More
                </button> : null
            }     
            <br/>   
            </div>
            <Footer/>
        </div>
    ) 
}

export default AllContents;