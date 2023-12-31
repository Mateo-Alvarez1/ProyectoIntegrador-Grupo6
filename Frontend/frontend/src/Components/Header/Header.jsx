
import { Link } from "react-router-dom"

import logo from "../../assets/logoPitchPlease.png"
import Navbar from "./Navbar/Navbar.jsx"
import './header.css'

const Header = () => {
  return (
    <header className="headerContainer">
        <div className="logoContainer">
          <Link to='/' className="logolink">
            <img src={logo} alt="" className="logo" />
            <div>
              <h2 className="logoName">Pitch Please</h2>
              <span>Reserva tu sonido</span>
            </div>
          </Link>
        </div>
        <Navbar/>
    </header>
  )
}

export default Header