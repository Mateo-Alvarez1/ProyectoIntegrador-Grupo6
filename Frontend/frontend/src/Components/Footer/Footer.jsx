import React from 'react'
import { Link } from "react-router-dom"
import logo from '../../assets/logoPitchPlease.png'
import facebook from "../../assets/facebook.svg"
import x from "../../assets/twitter.svg"
import instagram from "../../assets/instagram.svg"
import youtube from "../../assets/youtube.svg"
import "./footer.css"

const Footer = () => {
  return (
    <footer>
          <div className="logoContainer">
          <Link to='/' className="logolink">
            <img src={logo} alt="" className="logo" />
            <div className="containerCopyFooter">
            <h2 className="logoName logoNameFooter">Pitch Please</h2>
            <p className='copyright'>Todos los derechos reservados @2023</p>
            </div>
          </Link>
        </div>

        <div className='socialMediaContainer'>
            <a href="#"><img src={facebook} alt="Facebook PitchPlease" className='mediaIcon'/></a>
            <a href="#"><img src={instagram} alt="Instagram PitchPlease" className='mediaIcon' /></a>
            <a href="#"><img src={x} alt="X PitchPlease" className="mediaIcon x"  /></a>
            <a href="#"><img src={youtube} alt="Youtube PitchPlease" className='mediaIcon' /></a>
        </div>
    </footer>
  )
}

export default Footer
