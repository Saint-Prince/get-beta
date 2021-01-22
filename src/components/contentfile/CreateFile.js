import React, { useState, useRef, useContext } from "react"
import { useRouteMatch, useHistory } from "react-router-dom"
import UserContext from "../context/UserContext"
import "../Auth/auth.css"
import Axios from "axios"
import ErrorNotice from "../Misc/ErrorNotice"
// import { useForm } from "react-hook-form"

function CreateFile () {

    const [file, setFile] = useState("");
    // const [descrp, setDescription] = useState();
    // const [progress, setProgress] = useState(0);
    //accessing input element
    const el = useRef();
    const [error, setError] = useState();
    // const { register, handleSubmit } = useForm();

    const { userData } = useContext(UserContext);
    const history = useHistory();
    const match = useRouteMatch();
    const content_id = match.params.id

    const handleChange = (e) => {
        // setProgress(0)
        const file = e.target.files[0];
        // console.log(file)
        setFile(file);
    }

    const uploadFile = () => {
        const formData = new FormData();
        
        // let file = { file, descrp }
        // 
        formData.append("file", file); //appending file
        // console.log(formData)
        Axios.post(
            `http://localhost:5000/apiv1/vendors/contents/${content_id}/addfile`,
            formData,
            {
                headers: { "x-auth-token": userData.token }
            },
            // {
            //     onUploadProgress: (ProgressEvent) => {
            //         let progress = Math.round(ProgressEvent.loaded / ProgressEvent.total * 100) + "%";
            //         setProgress(progress);
            //     }
            // } , descrp
        ).then(res => {
            console.log(res);
            history.push(`/contents/view/${content_id}`)
        }).catch(err => err.response.data.msg && setError(err.response.data.msg))
    }
    

    // const submit = async (e) => {
    //     // e.preventDefault();
    //     try {
    //         const newFile = 
    //         { file, descrp, };
    //         await Axios.post(
    //             `http://localhost:5000/apiv1/vendors/contents/${content_id}/addfile`, 
    //             newFile,
    //             {
    //                 headers: { "x-auth-token": userData.token }
    //             }
    //         );
    //     } catch (err) {
    //         err.response.data.msg && setError(err.response.data.msg); 
    //     }
    // }
    // const onChange = (e) => {
    //     const doc = e.target.files[0]
    //     setFile(doc)
    //     console.log(file)
    // }

    return (
        <div className="page">
            <h2 style={{ padding: '1rem', color: "#0e5996" }}> Pick a File for Upload </h2>
            {
                error && <ErrorNotice message={error} clearError={() => setError(undefined)} />
            }
            <div className="form" style={{height: "100vh"}}>
                {/* <label htmlFor="content-file">File: </label> */}
                <input 
                    id="content-file" 
                    type="file" 
                    ref={el}
                    required
                    onChange={handleChange} 
                />

                {/* <div className="progressBar" style={{width: progress}}>
                    {progress}
                </div>

                <label htmlFor="content-descrp">Description: </label>
                <input 
                    id="content-descrp" 
                    type="text" 
                    placeholder= "e.g Part 1" 
                    onChange={e => setDescription(e.target.value)}
                /> */}
                <input type="submit" onClick={uploadFile} value="Upload File" />
            </div>
        </div>
    )
}

export default CreateFile;