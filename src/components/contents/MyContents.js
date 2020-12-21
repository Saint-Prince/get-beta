import React, { useContext, useEffect, useState } from "react"
import UserContext from "../context/UserContext"
import { useHistory} from "react-router-dom"
import { getContents } from "./Api"
import "./contents.css"
import logo from "../profile/octocat.jpg"
// import * as BiIcons from "react-icons/bi", Link 
import "../Auth/auth.css"

function MyContents () {

    const { userData } = useContext(UserContext);
    const history = useHistory();
    const [contents, setContents] = useState([])

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

    return (
        <div >    
            <input id="find" className="search" type="search" placeholder="Search Contents" />  <br/> <br/>
            {/* <label htmlFor="sort"> Sort By: </label>
            <select>
                <option value="recent"> Recently Added </option>
                <option value="recent"> Recently </option>
            </select> */}
            <p align="right"><button className="btn btn-lg btn-success"> Create Content </button> </p> <br/>
            <div className="align">
                <div className="card">
                    <div className="card-image"></div>  
                    <div className="card-text">
                        <span className="date"> 4 days ago </span>
                        <h2> Content for Babies</h2> <br/>
                        <p>
                            Bacon ipsum dolor amet short loin strip steak leberkas ribeye beef pork loin pork belly drumstick
                            frankfurter. Corned beef ball tip pork belly pig sirloin, ham hock chuck cow fatback strip steak
                            meatloaf.
                        </p>
                    </div>
                    <div className="card-stats">
                        <div className="stat">
                            <div className="value">4m</div>
                            <div className="text">read</div>
                        </div>
                        <div className="stat border">
                            <div className="value">5123</div>
                            <div className="text">views</div>
                        </div>
                        <div className="stat">
                            <div className="value">32</div>
                            <div className="text">comments</div>
                        </div>
                        {/* <button className="card-btn"> Visit <span>&rarr;</span> </button> */}
                    </div>      
                </div>
            </div>
            
            {
                contents.map( content => ( 

                    <div key={content._id}>
                        <h2> {content.title} </h2>
                        <p> {content.descrp} </p>
                    </div>
                ))
            }
        </div>
    ) 
}

export default MyContents;