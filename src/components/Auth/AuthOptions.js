import React, { useContext } from "react"
import { useHistory } from "react-router-dom"
import UserContext from "../context/UserContext"
import * as BiIcons from "react-icons/bi"

export default function AuthOptions () {

    const { userData, setUserData } = useContext(UserContext);
    const history = useHistory();
    
    // const register = () => history.push("/register")
    const login = () => history.push("/login")
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined,
        });
        localStorage.setItem("auth-token", "")
    };

    return (
        <nav className="auth-options">
            {
                userData.user ? 
                <>
                    <button onClick={logout}><BiIcons.BiLogOut /> Log out</button>  
                </> :
                <>
                    {/* <button onClick={register}> Register </button> */}
                    <button onClick={login}> <BiIcons.BiLogIn /> Log in </button> 
                </> 
            }
        </nav>
    )
}