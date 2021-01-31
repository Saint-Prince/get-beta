import React from "react"
import girl from "./girl1.jpg"
import explore from "./explore.jpg"
import business from "./businessmn.jpg"
import pro from "./productivepp.jpg"
import Footer from "./Footer"
import { Link } from "react-router-dom"

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

                <h1 style={headerStyles}
                > Produce, Distribute and earn </h1> <br/>
                <p align="left"> Get your content to a large audience at any time </p> <br/> <br/>

                <div className="img-container">
                    <img src={girl} alt="better girl" />  
                </div> <br/>

                <h3 style={headerStyles}> Take your business online and earn more. </h3> <br/> <br/>
                <div className="img-container">
                    <img src={pro} alt="better girl" />  
                </div> <br/>
                <p> 
                    GetBeta enables content creators to manage their content  <br/>
                    upload, distribute, and sell to enrollers
                </p> <br/>
                
                <h3 style={headerStyles}> Explore the world of betarians </h3> <br/>
                <div className="img-container">
                    <img src={explore} alt="better girl" />  
                </div> <br/>
                <p>
                    View more local and worldwide contents from your favorite vendors. <br/>
                    Explore, engage and share. <br/> 
                    You see, Thats how we get better!
                </p> <br/>
                <div className="but">
                    <Link to="/allcontents">
                        <button> 
                            Explore Contents! 
                        </button>
                    </Link>       
                </div> 
                <br/>
                <h3 style={headerStyles}> Sign up now as a member!</h3> <br/>
                <div className="img-container">
                    <img src={business} alt="better girl" />  
                </div> <br/>
                <p>
                    Ready to gain access to contents ? <br/>
                    If so, let's Sign In
                </p> <br/>
                <div className="but">
                    <Link to="/login">
                        <button>
                            Sign In!
                        </button>    
                    </Link>
                </div>
            </div>
        </div> <br/> <br/>
        <Footer/>
        </>
    )
}
