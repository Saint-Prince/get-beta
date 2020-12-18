import React from "react"
import "./contents.css"
// import * as BiIcons from "react-icons/bi"
import "../Auth/auth.css"

function MyContents () {
    return (
        <>    
            {/* <label htmlFor="find"><BiIcons.BiSearchAlt2 /> </label> */}
            <input id="find" className="search" type="search" placeholder="Search for a content" />  <br/> <br/>
            <p align="right"><button className="btn btn-lg btn-success"> Create Content </button> </p>
            
            <h2>All my Contents</h2>
        </>
    ) 
}

export default MyContents;