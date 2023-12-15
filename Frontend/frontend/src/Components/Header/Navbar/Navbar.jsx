import { useContext, useState } from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import { userContext } from '../../../context/userContext';
import { useEffect } from 'react';
import UserModal from '../../Modal/UserModal';

const Navbar = () => {

  const userContextResult = useContext(userContext);

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const token = userContextResult.userJwt;
  const user = userContextResult.user;

  const [initials, setInitials] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (user && user.nombre && user.apellido) {
      let nombreCompleto = [user.nombre, user.apellido];
      let nombreModificado = nombreCompleto[0].split('');
      let apellidoModificado = nombreCompleto[1].split('');
      let iniciales = (nombreModificado[0] + apellidoModificado[0]).toUpperCase();
      setInitials(iniciales);
    }
  }, [user]);


  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div className="menuContainer">
        <div className={`navItems ${isOpen && "open"}`}>
            {
              token !== null && user !== '' ? 
                <div className='containerLogout'>
                    <p onClick={() => {
                      userContextResult.logout()                      
                      navigate('/')}} 
                      className='logoutButton'>
                        Cerrar sesion
                      </p>
                  <div className='avatar' >
                      <p onClick={openModal}>{initials}</p>
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

        {token !== null && user && (<UserModal isOpen={isModalOpen} closeModal={closeModal} user={user}/>)}

        <div className={`toggle ${isOpen && "open"}`} onClick={handleMenuToggle}>
          <span></span>          
          <span></span>          
          <span></span>          
        </div>
    </div>
  )
}

export default Navbar