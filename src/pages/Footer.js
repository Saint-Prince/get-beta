import * as FaIcons from "react-icons/fa"

export default function Footer () {
    return (
        <footer>
            <ul className="footer-right">
                <li className="features">
                    <h3> Service </h3> <br/>
                    
                    <ul className="boxx ul">
                        <li> <a href="https://twitter.com"> FAQ </a> </li> <br/>
                        <h3> Contact Us </h3> <br/>
                        <h4> <a href="mailto:remetechnologysolutions@gmail.com" style={{color: "#8a5050"}}> <i> Send Mail <FaIcons.FaTelegram/> </i>  </a> </h4>
                    </ul>
                </li>
                <li className="features">
                    <h3> Social </h3> <br/>
                    
                    <ul className="boxx">
                        <li> <a href="https://twitter.com"><i> <FaIcons.FaTwitter/>  </i>Twitter</a> </li> <br/>
                        <li> <a href="https://instagram.com"><i style={{color: "#E1306C"}}> <FaIcons.FaInstagram/> </i>Instagram</a> </li> <br/>
                        <li> <a href="https://facebook.com"><i> <FaIcons.FaFacebook/> </i>Facebook</a> </li> <br/>
                        <li> <a href="https://youtube.com"><i style={{color: "#ef2525"}}> <FaIcons.FaYoutube/>  </i>YouTube</a> </li>
                    </ul>
                </li>
            </ul>

            <div className="footer-bottom">
                <h2> Get Beta</h2> <br/>
                <p> All Rights reserved by RemeTechnology Solution &copy; 2021 </p>
            </div>
        </footer>
    )
}