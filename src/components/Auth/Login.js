import React, { useState, useContext, useEffect } from "react"
import UserContext from "../context/UserContext"
import { useHistory, Link } from "react-router-dom"
import "./auth.css"
import Axios from "axios"
import ErrorNotice from "../Misc/ErrorNotice"

export default function Login () {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();

    const { userData, setUserData } = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {
        if (userData.user) history.push(`/profile`)
    })

    const submit = async (e) => {
        e.preventDefault();
        try {
            const loginUser = { email, password };
            const loginRes = await Axios.post(
                "http://localhost:5000/apiv1/vendors/login",
                loginUser 
            );
            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.vendor,
            });
            localStorage.setItem("auth-token", loginRes.data.token)
            history.push("/profile")
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg); 
        }
    }
    return (
        <div className="page">
            <h2 style={{ padding: '1rem' }}>Log in</h2>
            {
                error && <ErrorNotice message={error} clearError={() => setError(undefined)} />
            }
            <form className="form" onSubmit={submit} style={{height: "100vh"}}>
                <label htmlFor="login-email">Email: </label>
                <input 
                    id="login-email" 
                    type="email" 
                    onChange={e => setEmail(e.target.value)} 
                />

                <label htmlFor="login-password">Password: </label>
                <input 
                    id="login-password" 
                    type="password" 
                    onChange={e => setPassword(e.target.value)}
                />

                <input type="submit" value="Log In!" />
              <div>
                <p>Don't have an account?</p> <br/>
                <p> <Link className="reg-link"to="/register">Register</Link> </p>
            </div>  
            </form> <br/>
            
        </div>
    )
}