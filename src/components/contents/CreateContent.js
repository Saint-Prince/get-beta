import React, { useState, useContext } from "react"
import UserContext from "../context/UserContext"
import { useHistory } from "react-router-dom"
import "../Auth/auth.css"
import Spinner from "../Misc/Spinner"
import Axios from "axios"
import CurrencyInput from "react-currency-input-field"
import ErrorNotice from "../Misc/ErrorNotice"

export default function CreateContent () {

    const [title, setTitle] = useState();
    const [descrp, setDescription] = useState();
    const [price, setPrice] = useState();
    const [type, setType] = useState();
    const [tag, setTag] = useState([]);
    const [published, setPublish] = useState();
    const [format, setFormat] = useState();
    const [isActive, setActive] = useState(false);
    const [isLoading, setLoading] = useState(false)

    const [error, setError] = useState();

    const { userData } = useContext(UserContext);
    const history = useHistory();

    const handleToggle = () => {
        setActive(true)
    };
    const handleTogggle = () => {
        setActive(false)
    };

    const submit = async (e) => {
        setLoading(true)
        e.preventDefault();
        try {
            const newContent = 
            { title, descrp, price,  type, tag, format, published };
            await Axios.post(
                `http://localhost:5000/apiv1/vendors/newcontent`, 
                newContent,
                {
                    headers: { "x-auth-token": userData.token }
                }
            );
            setLoading(false)
            history.push(`/profile/myContents/${userData.user.id}`)  
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg); 
        }
    }
    const handleChange = (e) => {
        let handler = e.target.value
        let tagSplit = handler.split(/\r?\n/)
        setTag(tagSplit)  
    }
    

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
                <label htmlFor="content-type"> Method </label>
                   <input 
                        id="content-type" 
                        name="type"
                        type="radio" 
                        value="paid"
                        onClick={handleToggle}
                        required
                        onChange={e => setType(e.target.value)} 
                    /> Bill
                
                    <input 
                        id="content-type" 
                        name="type"
                        type="radio" 
                        value="free"
                        onClick={handleTogggle}
                        required
                        onChange={e => setType(e.target.value)} 
                    /> Free
                <div className={!isActive ? "price" : null}>
                  <label htmlFor="content-price">Price: </label>
                  <CurrencyInput
                    id="content-price"
                    name="input-name"
                    placeholder="0.00"
                    prefix="&#x20A6;"
                    defaultValue={1000}
                    fixedDecimalLength="2"
                    onValueChange={setPrice}
                    />
                    <p> Get Beta accepts 10 percent of content price  </p> <br/>
                </div>
                
                <label htmlFor="tags">Tags: </label>
                <textarea id="tags" 
                    cols={40} rows={5} 
                    onChange={handleChange}
                    //e => setTag(e.target.value)
                    placeholder="
                        music
                        tutorial 
                        pdf e.t.c"
                />
                <br/>
                <label htmlFor="content-publish" required> Publish your content </label> 
                    <input 
                        id="content-publish" 
                        name="published"
                        type="radio" 
                        value="private"
                        required
                        onChange={e => setPublish(e.target.value)} 
                    /> Private  
                    <input 
                        id="content-publish" 
                        name="published"
                        type="radio" 
                        value="public"
                        required
                        onChange={e => setPublish(e.target.value)} 
                    /> Public
                    <br/> <br/>
                <label htmlFor="content-format"> Content Format </label>
                    <input 
                        id="content-format" 
                        name="format"
                        type="radio" 
                        value="document"
                        onChange={e => setFormat(e.target.value)} 
                    /> Document
                
                    <input 
                        id="content-format" 
                        name="format"
                        type="radio" 
                        value="media"
                        onChange={e => setFormat(e.target.value)} 
                    /> Media
                    <input 
                        id="content-format" 
                        name="format"
                        type="radio" 
                        value="other"
                        onChange={e => setFormat(e.target.value)} 
                    /> Other
                    <br/> <br/>
                    {
                        isLoading ?
                        <>
                            <span> <Spinner/> </span> <br/>
                        </> : null
                    }
                <input type="submit" value="Create Content" /> 
            </form>
            <p>You can add your files after content creation</p>
        </div>
    )
}