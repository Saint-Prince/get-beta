import React from "react"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import "../Auth/auth.css"

export const EditForm = ({ userDetails, onSubmit }) => {
    
    const {register, handleSubmit} = useForm({
        defaultValues: { 
            email: userDetails ? userDetails.email: "",
            fullname: userDetails ? userDetails.fullname: "",
            cell_no: userDetails ? userDetails.cell_no: "",
            occupation: userDetails ? userDetails.occupation: "",
            hle: userDetails ? userDetails.hle: "",
            bio: userDetails ? userDetails.bio: "",
            location: userDetails ? userDetails.location: "",
        },
    });
    // const history = useHistory();

    const submitHandler = handleSubmit((data) => {
        onSubmit(data)
        // history.push("/")
    })

    return (
        <div className="page">
            <h2 style={{ padding: '1rem', textDecoration: "none" }}>
                <Link to="/profile" style={{ textDecoration: "none", color: "#0e5996" }}>
                    Profile
                </Link>
            </h2>

            <form className="form" onSubmit={submitHandler}>
                <label htmlFor="register-email">Email: </label>
                <input 
                    ref={register}
                    id="register-email" 
                    type="email" 
                    name="email"
                />

                <label htmlFor="register-full-name">Full Name: </label>
                <input 
                    id="register-full-name" 
                    type="text" 
                    ref={register}
                    name="fullname"
                />
                <input 
                    type="tel" 
                    placeholder="Enter mobile number"
                    ref={register}
                    name="cell_no"
                />
                <label htmlFor="occupation">Occupation: </label>
                <input 
                    id="occupation" 
                    type="text" 
                    ref={register}
                    name="occupation"
                />
                <label htmlFor="hle">Highest Level of Education: </label>
                <input 
                    id="hle" 
                    type="text" 
                    ref={register}
                    name="hle"
                />
                <label htmlFor="register-bio">Brief Biography: </label>
                <textarea id="register-bio" 
                    cols={40} rows={10} 
                    minLength={50}
                    ref={register}
                    name="bio"
                    placeholder="Min length: 50 characters"
                />
                <label htmlFor="location">Location: </label>
                <input 
                    id="location" 
                    type="text" 
                    ref={register}
                    name="location"
                />

                <input type="submit" value="Save!" />
            </form>
        </div>
    )
}