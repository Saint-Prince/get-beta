import React, { useState, useContext } from "react"
import { useRouteMatch, useHistory } from "react-router-dom"
import UserContext from "../context/UserContext"
import "../Auth/auth.css"
import Axios from "axios"
import ErrorNotice from "../Misc/ErrorNotice"

function CreateFile () {

    const [file, setFile] = useState();
    const [descrp, setDescription] = useState();

    const [error, setError] = useState();

    const { userData } = useContext(UserContext);
    const history = useHistory();
    const match = useRouteMatch();
    const content_id = match.params.id

    const submit = async (e) => {
        e.preventDefault();
        try {
            const newFile = 
            { file, descrp, };
            await Axios.post(
                `http://localhost:5000/apiv1/vendors/contents/${content_id}/addfile`, 
                newFile,
                {
                    headers: { "x-auth-token": userData.token }
                }
            );
            history.push(`/contents/view/${content_id}`)  
        } catch (err) {
            err.response.data.msg && setError(err.response.data.msg); 
        }
    }

    return (
        <div className="page">
            <h2 style={{ padding: '1rem', color: "#0e5996" }}> Choose a File to Upload </h2>
            {
                error && <ErrorNotice message={error} clearError={() => setError(undefined)} />
            }
            <form className="form" onSubmit={submit}>
                <label htmlFor="content-file">File: </label>
                <input 
                    id="content-file" 
                    type="file" 
                    required
                    placeholder="file name"
                    onChange={e => setFile(e.target.value)} 
                />

                <label htmlFor="content-descrp">Description: </label>
                <input 
                    id="content-descrp" 
                    type="text" 
                    placeholder= "e.g Part 1" 
                    onChange={e => setDescription(e.target.value)}
                />

                <input type="submit" value="Upload File" />
            </form>
            <p>You can add your files after content creation</p>
        </div>
    )
}

export default CreateFile;