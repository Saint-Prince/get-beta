import React, { useContext, useEffect, useState } from "react"
import UserContext from "../context/UserContext"
import { useHistory} from "react-router-dom"
import { getContents } from "./Api"
import "./contents.css"
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
            setContents(details)
            console.log(contents)
        }
        fetchContents();
    }, [history, userData.user, userData.token])

    return (
        <>    
            <input id="find" className="search" type="search" placeholder="Search for a content" />  <br/> <br/>
            {/* <label htmlFor="sort"> Sort By: </label>
            <select>
                <option value="recent"> Recently Added </option>
                <option value="recent"> Recently </option>
            </select> */}
            <p align="right"><button className="btn btn-lg btn-success"> Create Content </button> </p>
            
        </>
    ) 
}

export default MyContents;