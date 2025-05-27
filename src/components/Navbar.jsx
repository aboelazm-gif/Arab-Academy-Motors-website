import "../styles/navbar.css";
import {NavLink} from "react-router-dom";
import teamLogo from "../assets/images/AAM-white.png";
import pfp from "../assets/svg/profile-circle.svg";
import CustomModal from "./CustomModal";
import { useState, useEffect, useRef } from 'react';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target) && !event.target.closest('.hamburger-btn')) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    return <nav className="navbar">
        <a href="/" ><img className="team-logo" src={teamLogo} alt="" height="40px" /></a>
        
        {/* Desktop Navigation - visible on larger screens */}
        <ul className="nav-list desktop-nav">
            <li><NavLink to="../pages/AboutUs.jsx">ABOUT US</NavLink></li>
            <li><NavLink to="../pages/TeamPage.jsx">THE TEAM</NavLink></li>
            <li><NavLink to="../pages/JoinUs.jsx">JOIN US</NavLink></li>
        </ul>
        
        <div className="account-buttons desktop-nav">
            <CustomModal variant="signup" triggerContent={<><button className="signup-button">Sign Up</button></>}/>
            <CustomModal variant="login" triggerContent={<><img className="pfp" src={pfp} height="40px" alt="" /><p>Login</p></>}/>
        </div>

        {/* Hamburger Button */}
        <button className="hamburger-btn" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
        </button>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && <div className="menu-overlay" onClick={closeMenu}></div>}

        {/* Mobile Menu */}
        <div ref={menuRef} className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
            <ul className="nav-list">
                <li><NavLink to="../pages/AboutUs.jsx" onClick={closeMenu}>ABOUT US</NavLink></li>
                <li><NavLink to="../pages/TeamPage.jsx" onClick={closeMenu}>THE TEAM</NavLink></li>
                <li><NavLink to="../pages/JoinUs.jsx" onClick={closeMenu}>JOIN US</NavLink></li>
            </ul>
            <div className="account-buttons desktop-nav">
                <CustomModal variant="signup" triggerContent={<><button className="signup-button" onClick={closeMenu}>Sign Up</button></>}/>
                <CustomModal variant="login" triggerContent={<><img className="pfp" src={pfp} height="40px" alt="" /><button className="login-button" onClick={closeMenu}><p>Login</p></button></>}/>
            </div>
        </div>
    </nav>
}