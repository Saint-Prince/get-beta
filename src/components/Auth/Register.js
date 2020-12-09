import React, { useState, useContext } from "react"
import UserContext from "../context/UserContext"
import { useHistory } from "react-router-dom"
import "./auth.css"
import Axios from "axios"
import ErrorNotice from "../Misc/ErrorNotice"

export default function Register () {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [fullName, setFullName] = useState();
    const [cell_no, setMobileNumber] = useState();
    const [occupation, setOccupation] = useState();
    const [hle, setHLE] = useState();
    const [bio, setBio] = useState();
    const [referrer, setReferrer] = useState();

    const [error, setError] = useState();

    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault();
        try {
            const newUser = {email, password, passwordCheck, fullName, bio, occupation, hle, cell_no, referrer};
            await Axios.post(
                "http://localhost:50/users/register", 
                newUser,
            );
            const loginRes = await Axios.post(
                "http://localhost:50/users/login", {
                email,
                password,  
            });
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user,
            });
            localStorage.setItem("auth-token", loginRes.data.token)
            history.push("/profile")  
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg); 
        }
    }

    return (
        <div className="page">
            <h2 style={{ padding: '1rem' }}>Register</h2>
            {
                error && <ErrorNotice message={error} clearError={() => setError(undefined)} />
            }
            <form className="form" onSubmit={submit}>
                <label htmlFor="register-email">Email: </label>
                <input 
                    id="register-email" 
                    type="email" 
                    onChange={e => setEmail(e.target.value)} 
                />

                <label htmlFor="register-password">Password: </label>
                <input 
                    id="register-password" 
                    type="password" 
                    onChange={e => setPassword(e.target.value)}
                />
                <input 
                    placeholder="Verify Password" 
                    type="password" 
                    onChange={e => setPasswordCheck(e.target.value)} 
                />

                <label htmlFor="register-full-name">Full Name: </label>
                <input 
                    id="register-full-name" 
                    type="text" 
                    onChange={e => setFullName(e.target.value)} 
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
                    onChange={e => setBio(e.target.value)}
                    placeholder="Tell us a little about Yourself for better content access."
                />
                <label htmlFor="referrer">Referrer: </label>
                <input 
                    id="referrer" 
                    type="text" 
                    onChange={e => setReferrer(e.target.value)} 
                />

                <input type="submit" value="Register!" />
            </form>
        </div>   
    )
}