import { useState } from 'react'
import './Navbar.css'

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="menuContainer">
        <div className={`navItems ${isOpen && "open"}`}>
          <a className="registerButton">Iniciar Sesión</a>
          <a className="registerButton">Crear Cuenta</a>
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