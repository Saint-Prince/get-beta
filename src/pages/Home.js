import React from "react"

function Home () {

    let headerStyles= {
        textAlign: "center",
        textTransform: "uppercase",
        color: "#417fb1",
        letterSpacing: "1px"
    }
    return (
        <div className="post">
            <div>
                <h2 style={headerStyles}
                > Produce, Distribute and earn </h2> 
                <p align="center"> Get your content to a large audience 24/7! </p>
                <br/>  
                <p> 
                    Take your business online and earn more. <br/> <br/>
                    GetBeta enables content creators to manage their content in one place -- <br/>
                    upload, distribute (sell), and enable after-sales service to enrollers
                </p>
                <h3 style={headerStyles}> Let's getbeta and find contents</h3>
                <input type="search" />
                
                <h3 style={headerStyles}> Explore the world of betarians </h3>
                <p>
                    View more local and worldwide contents from your favorite vendors. <br/>
                    Explore, engage and share. <br/> <br/>
                    You see, Thats how we getbeta!
                </p>
                <h3 style={headerStyles}> Sign up now as a member!</h3>
                <p>
                    Ready to gain access to contents ? <br/>
                    If so, let's create an account 
                </p>
            </div>
        </div>
    )
}

export default Home;