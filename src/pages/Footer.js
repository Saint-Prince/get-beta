import * as FaIcons from "react-icons/fa"

export default function Footer () {
    return (
        <footer>
            <ul className="footer-right">
                <li className="features">
                    <h3> Service </h3> <br/>
                    
                    <ul className="boxx ul">
                        <li> <a href="https://twitter.com"> FAQ </a> </li> <br/>
                        <h3 style={{fontSize: "1.0rem"}}> Contact Us </h3> <br/>
                        <h4> <a href="mailto:remetechnologysolutions@gmail.com" style={{color: "#8a5050"}}> <i> Send Mail <FaIcons.FaTelegram/> </i>  </a> </h4>
                        <br/>
                        <h5> Developer Contact </h5> <br/>
                        <li> <a href="https://twitter.com/kelechithe3rd"> <FaIcons.FaTwitter/> </a> </li>
                    </ul>
                </li>
                <li className="features">
                    <h3> Social </h3> <br/>
                    
                    <ul className="boxx">
                        <li> <a href="https://twitter.com/remetech1"><i> <FaIcons.FaTwitter/>  </i>Twitter</a> </li> <br/>
                        <li> <a href="https://instagram.com/remetech1"><i style={{color: "#E1306C"}}> <FaIcons.FaInstagram/> </i>Instagram</a> </li> <br/>
                        <li> <a href="https://facebook.com/REME-Tech-Solutions-108895890929074"><i> <FaIcons.FaFacebook/> </i>Facebook</a> </li> <br/>
                        <li> <a href="https://youtube.com/channel/UCWOUHQBHnR7YzCU93bLqSlg"><i style={{color: "#ef2525"}}> <FaIcons.FaYoutube/>  </i>YouTube</a> </li>
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