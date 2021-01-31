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
            gender: userDetails ? userDetails.gender: "",
            bio: userDetails ? userDetails.bio: "",
            location: userDetails ? userDetails.location: "",
            twitter: userDetails ? userDetails.twitter: "",
            linkedIn: userDetails ? userDetails.linkedIn: "",
            facebook: userDetails ? userDetails.facebook: "",
            instagram: userDetails ? userDetails.instagram: "",
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
                {/* <label htmlFor="register-email">Email: </label>
                <input 
                    ref={register}
                    id="register-email" 
                    type="email" 
                    name="email"
                /> */}

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
                <label htmlFor="gender">Gender </label>
                <input 
                    id="gender" 
                    type="text" 
                    ref={register}
                    name="gender"
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
                <h3 style={{ padding: '1rem', textDecoration: "none", color: "#0e5996" }}>
                    Social Media Links
                </h3>
                <label htmlFor="twitter">Twitter: </label>
                <input 
                    id="twitter" 
                    type="text" 
                    ref={register}
                    name="twitter"
                />
                <label htmlFor="linkedIn">LinkedIn: </label>
                <input 
                    id="linkedIn" 
                    type="text" 
                    ref={register}
                    name="linkedIn"
                />
                <label htmlFor="facebook">Facebook: </label>
                <input 
                    id="facebook" 
                    type="text" 
                    ref={register}
                    name="facebook"
                />
                <label htmlFor="instagram">Instagram: </label>
                <input 
                    id="instagram" 
                    type="text" 
                    ref={register}
                    name="instagram"
                />

                <input type="submit" value="Save!" />
            </form>
        </div>
    )
}