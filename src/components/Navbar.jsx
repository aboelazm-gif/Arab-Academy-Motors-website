import "../styles/navbar.css";
import {NavLink} from "react-router-dom";
import teamLogo from "../assets/images/AAM-white.png";
import pfp from "../assets/svg/profile-circle.svg";
import CustomModal from "./CustomModal";
export default function Navbar() {
    return <nav className="navbar">
        <a href="/" ><img className="team-logo" src={teamLogo} alt="" height="40px" /></a>
        <ul className="nav-list">
            <li><NavLink to="../pages/AboutUs.jsx">ABOUT US</NavLink></li>
            <li><NavLink to="../pages/TeamPage.jsx">THE TEAM</NavLink></li>
            <li><NavLink to="../pages/JoinUs.jsx">JOIN US</NavLink></li>
        </ul>
        <div className="account-buttons">
            <CustomModal variant="signup" triggerContent={<><button className="signup-button">Sign Up</button></>}/>
            <CustomModal variant="login" triggerContent={<><img className="pfp" src={pfp} height="40px" alt="" /><p>Login</p></>}/>
        </div>       
    </nav>
}