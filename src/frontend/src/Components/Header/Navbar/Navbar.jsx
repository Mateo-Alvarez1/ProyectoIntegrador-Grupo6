import { useContext, useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom';
import { userContext } from '../../../context/userContext';

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const { user  , userJwt , logout } = useContext(userContext)

  const token = userJwt;

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  const iniciales = (user) => {
    if (user !== undefined) {
      let nombreCompleto = [user.nombre , user.apellido];
      let nombreModificado = nombreCompleto[0].split("")
      let apellidoModificado = nombreCompleto[1].split("")
      let iniciales = (nombreModificado[0] + apellidoModificado[0]).toUpperCase()
      return iniciales;
    }else{
      return '';
    }
  } 
 


  return (
    <div className="menuContainer">
        <div className={`navItems ${isOpen && "open"}`}>
            {
              token !== null ? 
                <div className='containerLogout'>
                    <a onClick={() => logout}>Cerrar sesion</a>
                  <div className='avatar'>
                    <p>{iniciales(user)}</p>
                  </div>
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