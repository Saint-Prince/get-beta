import React, { useContext, useEffect, useState, useRef } from "react"
import { useHistory, Link } from "react-router-dom"
import UserContext from "../context/UserContext"
import { getUser } from "./Api"
import ErrorNotice from "../Misc/ErrorNotice"
import Axios from "axios"
import "./profile.css"
import logo from "./octocat.jpg"
import Modal from  "./Modal"
import * as HiIcons from "react-icons/hi"
import * as GrIcons from "react-icons/gr"
import * as FaIcons from "react-icons/fa"
import * as IoIcons from "react-icons/io"

function ProfilePage () {
    
    const { userData } = useContext(UserContext);
    const history = useHistory();
    const [userDetails, setUserDetails] = useState({})
    const [isOpen, setOpen] = useState(false)
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        
        if (! userData.user) 
            return history.push("/login")

        const fetchProfile = async () => {
            let id = userData.user.id
            let token = userData.token
            const details = await getUser(token, id)
            setUserDetails(details)
        }
        fetchProfile();
    }, [history, userData.user, userData.token])

    const [file, setFile] = useState("");
    //accessing input element
    const el = useRef();
    const [error, setError] = useState();

    const handleChange = (e) => {
        // setProgress(0)
        const file = e.target.files[0];
        // console.log(file)
        setFile(file);
    }

    const uploadFile = () => {
        const formData = new FormData();
        setLoading(true)
        formData.append("file", file); //appending file
        // console.log(formData)
        Axios.put(
            `http://localhost:5000/apiv1/vendors/${userData.user.id}/img`,
            formData,
            {
                headers: { "x-auth-token": userData.token }
            }
        ).then(res => {
            setLoading(false)
            console.log(res);
            history.push(`/profile`)
        }).catch(err => err.response.data.msg && setError(err.response.data.msg), setLoading(false))
    }

    return (
        <div className="profile-card"> 
        {
            userDetails ? 
            <>
                <img src={ userDetails.img ? userDetails.img : logo } 
                    style= {{
                        boxShadow: "0 2px 7px 0 rgba(0, 0, 0, 0.5)",
                        borderRadius: "50px",
                    }}
                    alt="Profile Img" className="profile-pic" />
                <span>
                    <button className="btn" onClick={() => setOpen(true)} > <HiIcons.HiOutlinePencil /> </button>
                </span>
                <Modal open={isOpen} 
                    onClose={() => setOpen(false)}
                    el={el}
                    handleChange={handleChange}
                    uploadFile={uploadFile}
                    loading={isLoading}
                >
                {
                    error && <ErrorNotice message={error} clearError={() => setError(undefined)} />
                }
                    <h2 style={{ padding: '1rem', color: "#0e5996" }}> Edit Image </h2>
                </Modal>
                <div className="title"> <br/>
                    <h2 style={{ marginLeft: '10%', color: "#0e5996" }}>  {userDetails.fullname} 
                    </h2> 
                </div>
                
                <div className="main-container">
                    <p> <i className="info"> <HiIcons.HiBriefcase/> </i> {userDetails.occupation} </p> <br/>
                    { userDetails.location ? <p> <i className="info"> <GrIcons.GrLocationPin/> </i> {userDetails.location} </p> : null}<br/>
                    <p> <i className="info"> <FaIcons.FaEnvelope/> </i> {userDetails.email} </p> <br/>
                    { userDetails.gender ? <p> <i className="info"> <FaIcons.FaGenderless/> </i> {userDetails.gender} </p> : null }<br/>
                    <p> <i className="info">Bio:</i> {userDetails.bio} </p> <br/>
                    { userDetails.cell_no ? <p> <i className="info"> <GrIcons.GrPhone/> </i> {userDetails.cell_no} </p> : null }<br/>
                    { userDetails.hle ? <p> <i className="info"> <IoIcons.IoMdSchool/> </i> {userDetails.hle} </p> : null }<br/>
                    <p className="media">
                    
                        <span>
                            { userDetails.twitter ? <a href={userDetails.twitter} style={{color: "#00b8ff"}}> <FaIcons.FaTwitter/> </a> : null }
                        </span>
                        <span>
                            { userDetails.instagram ?  <a href={userDetails.instagram} style={{color: "#E1306C"}}> <FaIcons.FaInstagram/> </a> : null }
                        </span>    
                        <span>
                            { userDetails.linkedIn ? <a href={userDetails.linkedIn} style={{color: "#5b95dc"}}> <FaIcons.FaLinkedin/> </a> : null }
                        </span>    
                        <span>
                            {userDetails.facebook ? <a href={userDetails.facebook} style={{color: "#004eff"}}> <FaIcons.FaFacebook/> </a> : null}
                        </span>        
                    </p>
                    <hr/> <br/>
                    <span>
                        <Link to={`/profile/edit/${userDetails.id}`} > 
                            <button className="btn" style={{background: "#7fb9e2", color: "#fff"}}> 
                                Edit Profile 
                            </button>
                        </Link>
                    </span>

                </div>
                <div className="title">
                    <h3 style={{ margin: '0 10%', color: "#0e5996" }}> Add wallet for content earnings
                    </h3> 
                </div>               
            </> : 
            <div>
                Loading...
            </div>
        }
                
        </div>
    )
}

export default ProfilePage;