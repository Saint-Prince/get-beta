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
    const [cell_no, setMobileNumber] = useState();
    const [occupation, setOccupation] = useState();
    const [hle, setHLE] = useState();
    const [bio, setBio] = useState();
    const [location, setLocation] = useState();
    const [referrer, setReferrer] = useState();

    const [error, setError] = useState();

    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();
        try {
            const newContent = 
            {title, descrp, price, bio, occupation, hle, cell_no, referrer, location};
            // if (password !== passwordCheck) 
            //     return alert("Password doesn't match.")
            await Axios.post(
                "http://localhost:5000/apiv1/vendors/register", 
                newContent,
            );
            // const loginRes = await Axios.post(
            //     "http://localhost:5000/apiv1/vendors/login", {
            //     email,
            //     password,  
            // });
            // setUserData({
            //     token: loginRes.data.token,
            //     user: loginRes.data.vendor,
            // });
            // localStorage.setItem("auth-token", loginRes.data.token)
            // history.push("/profile")  
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg); 
        }
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
                    onChange={e => setTitle(e.target.value)} 
                />

                <label htmlFor="content-descrp">Description: </label>
                <input 
                    id="content-descrp" 
                    type="text" 
                    placeholder= "About Content..." 
                    onChange={e => setDescription(e.target.value)}
                />
                <label>
                   <input 
                        id="content-type" 
                        name="type"
                        type="radio" 
                        value="paid"
                        onChange={e => setPrice(e.target.value)} 
                    /> Bill
                </label>
                <label>
                    <input 
                        id="content-free" 
                        name="type"
                        type="radio" 
                        value="free"
                        onChange={e => setPrice(e.target.value)} 
                    /> Free
                </label>
                <label htmlFor="content-price">Price: </label>
                <input 
                    id="content-price" 
                    type="number" 
                    onChange={e => setPrice(e.target.value)} 
                />
                <input 
                    type="tel" 
                    placeholder="Enter mobile number"
                    onChange={e => setMobileNumber(e.target.value)} 
                />
                <label htmlFor="occupation">Occupation: </label>
                <input 
                    id="occupation" 
                    type="text" 
                    onChange={e => setOccupation(e.target.value)} 
                />
                <label htmlFor="hle">Highest Level of Education: </label>
                <input 
                    id="hle" 
                    type="text" 
                    onChange={e => setHLE(e.target.value)} 
                />
                <label htmlFor="register-bio">Bio: </label>
                <textarea id="register-bio" 
                    cols={40} rows={10} 
                    minLength={50}
                    onChange={e => setBio(e.target.value)}
                    placeholder="Min length: 50 characters"
                />
                <label htmlFor="location">Location: </label>
                <input 
                    id="location" 
                    type="text" 
                    onChange={e => setLocation(e.target.value)} 
                />
                <label htmlFor="referrer">Referrer: </label>
                <input 
                    id="referrer" 
                    type="text" 
                    onChange={e => setReferrer(e.target.value)} 
                />

                <input type="submit" value="Create Content" />
            </form>
        </div>
    )
}