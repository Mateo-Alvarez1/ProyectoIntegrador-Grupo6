import { useContext, useState } from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import { userContext } from '../../../context/userContext';

const Navbar = () => {

  const [isOpen, setIsOpen] = useState(false);
  const userContextResult = useContext(userContext)
  const navigate = useNavigate();

  const token = userContextResult.userJwt;
  const user = userContextResult.user;

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
                    <p onClick={() => {
                      userContextResult.logout()
                      navigate('/')}} 
                      className='logoutButton'>
                        Cerrar sesion
                      </p>
                  <div className='avatar'>
                    <Link to='/profile'>
                      <p>{iniciales(user)}</p>
                    </Link>
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