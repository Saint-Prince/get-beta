import React from "react"
import girl from "./girl1.jpg"
import Footer from "./Footer"

export default function Home () {

    let headerStyles= {
        textAlign: "left",
        textTransform: "capitalize",
        color: "#417fb1",
        letterSpacing: "1px"
    }
    return (
        <>
        <div className="post">
            <div>
                <img src={girl} alt="better girl" />
                <h1 style={headerStyles}
                > Produce, Distribute and earn </h1> <br/>
                <p align="left"> Get your content to a large audience 24/7, </p>
                <p> 
                    Take your business online and earn more. <br/> <br/>
                    GetBeta enables content creators to manage their content in one place -- <br/>
                    upload, distribute, and sell to enrollers
                </p> <br/>
                
                <h3 style={headerStyles}> Explore the world of betarians </h3> <br/>
                <p>
                    View more local and worldwide contents from your favorite vendors. <br/>
                    Explore, engage and share. <br/> 
                    You see, Thats how we get better!
                </p> <br/>
                <h3 style={headerStyles}> Sign up now as a member!</h3> <br/>
                <p>
                    Ready to gain access to contents ? <br/>
                    If so, let's create an account 
                </p>
            </div>
        </div> <br/> <br/>
        <Footer/>
        </>
    )
}
