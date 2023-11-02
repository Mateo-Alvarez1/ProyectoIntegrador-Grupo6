import { useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom';

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="menuContainer">
        <div className={`navItems ${isOpen && "open"}`}>
          <Link to={'/login'} className="registerButton">
            Iniciar Sesión
          </Link>
          <Link to={`/signup`} className="registerButton">
            Crear Cuenta
          </Link>
        </div>
        <div className={`toggle ${isOpen && "open"}`} onClick={handleMenuToggle}>
          <span></span>          
          <span></span>          
          <span></span>          
        </div>
    </div>
  )
}

export default Navbar