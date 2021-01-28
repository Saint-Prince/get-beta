import * as FaIcons from "react-icons/fa"

export default function Footer () {
    return (
        <footer>
            <ul className="footer-right">
                <li className="features">
                    <h3> Service </h3> <br/>
                    
                    <ul className="box ul">
                        <li> <a href="#"> FAQ </a> </li> <br/>
                        <h3> Contact Us </h3> <br/>
                        <h4> <a href="mailto:remetechnologysolutions@gmail.com"> <i> Send Mail <FaIcons.FaTelegram/> </i>  </a> </h4>
                    </ul>
                </li>
                <li className="features">
                    <h3> Social </h3> <br/>
                    
                    <ul className="box">
                        <li> <a href="#"><i> <FaIcons.FaTwitter/>  </i>Twitter</a> </li> <br/>
                        <li> <a href="#"><i> <FaIcons.FaInstagram/> </i>Instagram</a> </li> <br/>
                        <li> <a href="#"><i> <FaIcons.FaYoutube/>  </i>YouTube</a> </li>
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