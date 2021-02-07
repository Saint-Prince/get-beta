import React from "react"
import "../Auth/auth.css"

export default function Modal({ open, children, onClose, el, handleChange, uploadFile }) {

    if (!open) return null

    return (
        <div>
            {children} <br/>
            
            <div className="form" >
                {/* <label htmlFor="content-file">File: </label> */}
                <input 
                    id="content-file" 
                    type="file" 
                    ref={el}
                    required
                    onChange={handleChange} 
                />
                <div style={{ display: "inline-flex"}}>
                    <button onClick={onClose}
                        style= {{
                            padding: "5px",
                            borderRadius: "12px",
                            height: "37px",
                            outline: "none",
                            border: "1px solid #ec5050",
                            margin: "0 55%",
                            color: "#fff",
                            background: "#f94646"
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