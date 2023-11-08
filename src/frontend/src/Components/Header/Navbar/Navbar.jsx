import { useContext, useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom';
import { userContext } from '../../../context/userContext';

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const { user  , userJwt , logout } = useContext(userContext)
  const token = userJwt;
  //console.log(user);
  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="menuContainer">
        <div className={`navItems ${isOpen && "open"}`}>
            {
              token !== null ? 
                <div className='containerLogout'>
                    <p>{user.nombre + " " + user.apellido}</p>
                    <button onClick={() => logout}>Cerrar sesion</button>
                </div>
          
              :
              <>
                <Link to={'/login'} className="registerButton">
                  Iniciar Sesión
                </Link>
                <Link to={`/signup`} className="registerButton">
                  Crear Cuenta
                </Link>
                </>
          
            }
        
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