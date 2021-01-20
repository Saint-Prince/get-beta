import React, { useState, useContext } from "react"
import UserContext from "../context/UserContext"
import { useHistory } from "react-router-dom"
import "../Auth/auth.css"
import Axios from "axios"
import ErrorNotice from "../Misc/ErrorNotice"

export default function CreateContent () {

    const [title, setTitle] = useState();
    const [descrp, setDescription] = useState();
    const [price, setPrice] = useState();
    const [type, setType] = useState();
    const [tag, setTag] = useState([]);
    const [format, setFormat] = useState();
    const [isActive, setActive] = useState("false");

    const [error, setError] = useState();

    const { userData } = useContext(UserContext);
    const history = useHistory();

    const handleToggle = () => {
        setActive(!isActive)
    };
    const handleTogggle = () => {
        setActive("false")
    };

    const submit = async (e) => {
        e.preventDefault();
        try {
            const newContent = 
            { title, descrp, price,  type, tag, format };
            await Axios.post(
                `http://localhost:5000/apiv1/vendors/newcontent`, 
                newContent,
                {
                    headers: { "x-auth-token": userData.token }
                }
            );
            history.push(`/myContents`)  
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg); 
        }
    }
    // let tagData = tag;
    // let tagSplit = tagData.split(/\r?\n/)
    // console.log(tagData)
    // console.log(tag)

    return (
        <div className="page">
            <h2 style={{ padding: '1rem', color: "#0e5996" }}> Enter Content Details </h2>
            {
                error && <ErrorNotice message={error} clearError={() => setError(undefined)} />
            }
            <form className="form" onSubmit={submit}>
                <label htmlFor="content-title">Title: </label>
                <input 
                    id="content-title" 
                    type="text" 
                    required
                    placeholder="content name"
                    onChange={e => setTitle(e.target.value)} 
                />

                <label htmlFor="content-descrp">Description: </label>
                <input 
                    id="content-descrp" 
                    type="text" 
                    required
                    placeholder= "about content..." 
                    onChange={e => setDescription(e.target.value)}
                />
                <label>
                   <input 
                        id="content-type" 
                        name="type"
                        type="radio" 
                        value="paid"
                        onClick={handleToggle}
                        onChange={e => setType(e.target.value)} 
                    /> Bill
                </label>
                <label>
                    <input 
                        id="content-free" 
                        name="type"
                        type="radio" 
                        value="free"
                        onClick={handleTogggle}
                        onChange={e => setType(e.target.value)} 
                    /> Free
                </label>
                <div className={isActive ? "price" : null}>
                  <label htmlFor="content-price">Price: </label>
                    <input 
                        id="content-price" 
                        type="number" 
                        onChange={e => setPrice(e.target.value)} 
                    />  
                </div>
                
                <label htmlFor="tags">Tags: </label>
                <textarea id="tags" 
                    cols={40} rows={5} 
                    onChange={e => setTag(e.target.value)}
                    placeholder="e.g music, tutorial, pdf e.t.c"
                />
                <p>Content Format:</p> <br/>
                <label>
                    <input 
                        id="content-doc" 
                        name="format"
                        type="radio" 
                        value="document"
                        onChange={e => setFormat(e.target.value)} 
                    /> Document
                </label>
                <label>
                    <input 
                        id="content-media" 
                        name="format"
                        type="radio" 
                        value="media"
                        onChange={e => setFormat(e.target.value)} 
                    /> Media
                </label>
                <label>
                    <input 
                        id="content-other" 
                        name="format"
                        type="radio" 
                        value="other"
                        onChange={e => setFormat(e.target.value)} 
                    /> Other
                </label>

                <input type="submit" value="Create Content" />
            </form>
            <p>You can add your files after content creation</p>
        </div>
    )
}