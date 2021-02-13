import React from "react"
import "../Auth/auth.css"
import Spinner from "../Misc/Spinner"

export default function Modal({ open, children, onClose, el, handleChange, uploadFile, loading }) {

    if (!open) return null

    return (
        <div>
            {children} <br/>
            
            <div className="form" style={{ margin: "0 5%" }}>
                {/* <label htmlFor="content-file">File: </label> */}
                <input 
                    id="content-file" 
                    type="file" 
                    ref={el}
                    required
                    onChange={handleChange} 
                />
                {
                    loading === true ?
                    <>
                        <span> <Spinner/> </span> <br/>
                    </> : null
                }
                <div style={{ display: "inline-flex"}}>
                    <button onClick={onClose}
                        style= {{
                            padding: "10px",
                            borderRadius: "12px",
                            height: "37px",
                            outline: "none",
                            border: "1px solid #ec5050",
                            margin: "0 40%",
                            color: "#fff",
                            background: "#f56464"
                        }}
                    > 
                        Cancel 
                    </button>
                    <input type="submit" onClick={uploadFile} value="Upload" />
                </div>
                
            </div>       
        </div>
    )
}