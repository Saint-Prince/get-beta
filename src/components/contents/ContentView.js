import React, { useContext, useEffect, useState, useRef } from "react"
import { useHistory, useRouteMatch, Link } from "react-router-dom"
import UserContext from "../context/UserContext"
import Modal from  "../profile/Modal"
import ErrorNotice from "../Misc/ErrorNotice"
import Axios from "axios"
import logo from "../profile/pic-img.jpeg"
import "./view.css"
import { getContent, deleteContent, getContentFiles } from "./Api"
import { getUser } from "../profile/Api"

function ContentView () {

    const { userData } = useContext(UserContext);
    const history = useHistory();
    const match = useRouteMatch()
    const [contentDetails, setContentDetails] = useState({})
    const [contentFiles, setContentFiles] = useState([])
    const [userDetails, setUserDetails] = useState({})
    const [enrolled, setEnrolled] = useState("")
    const [isOpen, setOpen] = useState(false)
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        
        if (! userData.user) 
            return history.push("/login")

        const fetchContent = async () => {
            let content_id = match.params.id
            let token = userData.token
            const details = await getContent(token, content_id)
            setContentDetails(details.content)
        }
        const fetchProfile = async () => {
            let id = userData.user.id
            let token = userData.token
            const user = await getUser(token, id)
            setUserDetails(user)
        }
        const fetchContentFiles = async () => {
            let id = match.params.id
            let token = userData.token
            const details = await getContentFiles(token, id)
            setContentFiles(details.contentfiles)
        }     

        fetchProfile();
        fetchContent();
        fetchContentFiles();
        
    }, [history, userData.user, userData.token, match.params.id ])

    useEffect(() => {

        let subids = contentDetails.subscriberids
        // console.log(subids);
        if (subids) {
            if (subids.includes(userDetails.id)) { 
                setEnrolled("true");
            } else {
                setEnrolled("false");
            }
        }
        

    }, [contentDetails.subscriberids, userDetails.id])

    const removeContent = async (content_id) => {
        let choice = prompt("Please confirm content title to delete", `${contentDetails.title}`)
        if (choice === contentDetails.title) {
            let token = userData.token;
            await deleteContent(token, content_id, match.params.id )
            history.push(`/profile/myContents/${userDetails.id}`)
        }
    }
    let subidsLength;

    if (enrolled) {
        subidsLength = contentDetails.subscriberids.length - 1;
    }

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
            `https://get-beta.herokuapp.com/apiv1/vendors/contents/${contentDetails._id}/img`,
            formData,
            {
                headers: { "x-auth-token": userData.token }
            }
        ).then(res => {
            setLoading(false)
            console.log(res);
            history.push(`/profile/myContents/${userData.user.id}`)
        }).catch(err => err.response.data.msg && setError(err.response.data.msg), setLoading(false))
    }

    return (
        
        <div className="view">
            {
                contentDetails ?
                <>
                <div className="details">
                    <div className="big-img">
                        <img src={contentDetails.coverImage ? contentDetails.coverImage : logo} alt="content"/>
                    </div>  

                    <div className="box">
                        <div className="row">
                            <h2> {contentDetails.title} </h2>
                            <span> {contentDetails.type === "free" ? "Free" : contentDetails.price} </span>
                        </div>

                        <p> {contentDetails.descrp} </p>
                        <p>Tags: 
                            <span style={{
                                    background: "#e9eade",
                                    color: "#484444"
                                }}
                            > {contentDetails.tag} </span>  
                        </p>
                        
                        <p> 
                            { 
                                subidsLength >= 1 ? 
                                <Link to={`/contents/enrollers/${contentDetails._id}`} style={{
                                    color: "#ed143d",
                                    fontSize: "17px"
                                }}>
                                    { subidsLength } enrolled
                                </Link> : 
                                <> No one has enrolled to this content </>
                            } 
                        </p>
                        
                        <p> Created At: { contentDetails.createdAt ? contentDetails.createdAt.substr(0, 10) : null }</p>
                        <p> Last Updated: { contentDetails.updatedAt ? contentDetails.updatedAt.substr(0, 10) : null }</p>
                        
                        {
                           contentDetails.vendorId !== userDetails.id ? 
                           <div> 
                               {
                                   enrolled === "true" ?
                                   <span style={{
                                        background: "#65f5b9",
                                        padding: "8px",
                                        color: "#484444",
                                        borderRadius: "10px"
                                    }}>
                                        enrolled 
                                    </span> :
                                     <Link to={`/contents/enroll/${contentDetails._id}`} style={{textDecoration: "none", color: "#fff"}}>
                                        <button className="cart" style={{background: "#7fb9e2"}}>
                                            Enroll
                                        </button>
                                    </Link>
                               }

                                <Link to={`/profile/view/${contentDetails.vendorId}`}
                                    className="cart" style={{ textDecoration: "none", background: "#ec64f5", marginLeft: "40%", fontSize: "14px"}}>
                                    Creator
                                </Link> 
                            </div> : null
                        }
                        {
                            contentDetails.vendorId === userDetails.id ?
                            <div>
                                <p style={{
                                    background:" #e5f565",
                                    width: "18%",
                                    textAlign: "center",
                                    color: "#484444",
                                    borderRadius: "50px"
                                }}>
                                    { contentDetails.published === "private" ? "Private" : "Public" } 
                                </p>
                                <Link to={`/contents/edit/${contentDetails._id}`} style={{textDecoration: "none", color: "#fff"}}>
                                    <button className="cart" style={{background: "#7fb9e2"}}>
                                        Edit
                                    </button>
                                </Link>
                                 
                                <button onClick={() => removeContent(contentDetails._id)}
                                    className="cart" style={{background: "#f56464", marginLeft: "40%"}}>
                                    Delete
                                </button> 
                                
                                <Link to={`/contents/newFile/${contentDetails._id}`} style={{textDecoration: "none", color: "#fff"}}>
                                    <button className="cart" style={{background: "#7fb9e2"}}>
                                        Add File
                                    </button>  
                                </Link>
                                 
                                <button className="cart" style={{marginLeft: "60px"}}
                                    onClick={() => setOpen(true)}
                                >
                                    Edit Cover Image
                                </button> <br/> <br/>
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
                                </div> : 
                                null 
                            }
                            <>  <br/> <br/> </>
                            <hr/>
                        </div> 
                    </div>
                    <div style={{margin: "0 5%"}}>
                    <h2> { contentFiles.length === 0 ? "No files attached to this content" : "Files"} </h2>
                        {
                            contentFiles ? 
                            contentFiles.map( (contentFile, index) => {
                                
                                let size;
                                if (contentFile.storageUsed  <= 999999) {
                                    size = Math.round(contentFile.storageUsed / 1000)+ " kb"
                                } else if (contentFile.storageUsed  <= 999999999 ) {
                                    size = Math.round(contentFile.storageUsed / 1000000)+ " mb"
                                } else {
                                    size = Math.round(contentFile.storageUsed / 1000000000) + " gb"
                                }
                                return (
                                <ul key={contentFile._id} className="filelist">
                                    <li>
                                        <span className="number"> {index + 1 + "."}  </span>
                                        <span className="name" style={{marginRight: "10%"}}> { contentFile.dateCreated.substr(0, 10) } </span>
                                        {
                                            enrolled === "true" ? 
                                            <Link to={`/contentfile/view/${contentFile._id}`} >
                                               View 
                                            </Link> : 
                                            <span style={{ display: "contents", marginLeft: "20%"}}> Enroll to gain access </span>

                                        }
                                    </li>
                                    <li>
                                        
                                        <span className="points" style={{width: "100px"}}>
                                            {contentFile.filename}                                              
                                        </span>
                                        <span className="badge" style={{marginLeft: "30%"}} >
                                            { size + " " } 
                                        </span>
                                    </li>

                                </ul>)
                        }) : <div> Loading... </div>
                        } <br/><br/>
                    </div>

                </>
                : <div>Loading...</div>
            }
            
        </div> 
    )
}

export default ContentView