import React from "react"
import { Link } from "react-router-dom"
import "./contents.css"
import * as FaIcons from "react-icons/fa"
import * as GiIcons from "react-icons/gi"
import * as BiIcons from "react-icons/bi"

function Content () {
    return (
        <div className="contents">
            <h1> Let's Increase our Productivity </h1>
            <div className="services">
                <div className="content content-explore">
                    <FaIcons.FaWpexplorer className="fab explorer" />
                    <h2 className="card-header">Explore Contents</h2>
                    <p className="card-text">
                        Our friends have something in store for us. Would you like to check it out ? 
                    </p>
                    <Link to="#" className="card-btn">
                        Let's Go <span> &rarr; </span>
                    </Link>
                </div>
                <div className="content my-contents">
                    <BiIcons.BiBookContent className="fab my-content" />
                    <h2 className="card-header">My Contents</h2>
                    <p className="card-text">
                        Okay, let's take a look at what we have so far
                    </p>
                    <Link to="#" className="card-btn">
                        Yes <span> &rarr; </span>
                    </Link>
                </div>
                <div className="content enrolled">
                    <GiIcons.GiPencil className="fab enroll" />
                    <h2 className="card-header">Enrolled Contents</h2>
                    <p className="card-text">
                        What have we here for ourselves 
                    </p>
                    <Link to="#" className="card-btn">
                        View <span> &rarr; </span>
                    </Link>
                </div>
            </div>
            
        </div>
    )
}

export default Content;