import { useContext, useState } from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom';
import { userContext } from '../../../context/userContext';
import { useEffect } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

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

        <Modal
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="user-modal-title"
        aria-describedby="user-modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 300, bgcolor: 'white', boxShadow: 24, p: 4, borderRadius: 8 }}>
          <Typography variant="h6" component="h2" gutterBottom style={{ marginBottom: 16 }}>
            Tu Perfil:
          </Typography>
          <div style={{ marginBottom: 12 }}>
          <Typography variant="body1" id="user-modal-description" gutterBottom>
            <strong>Nombre:</strong> {user.nombre}
          </Typography>
          <Typography variant="body1" id="user-modal-description" gutterBottom>
          <strong>Apellido:</strong> {user.apellido}
          </Typography>
          <Typography variant="body1" id="user-modal-description" gutterBottom>
          <strong>Email:</strong> {user.email}
          </Typography>
          <Typography variant="body1" id="user-modal-description" gutterBottom>
          <strong>Rol:</strong> {user.rol}
          </Typography>
          </div>
          <Button onClick={closeModal} variant="contained">Cerrar</Button>
        </Box>
      </Modal>

        <div className={`toggle ${isOpen && "open"}`} onClick={handleMenuToggle}>
          <span></span>          
          <span></span>          
          <span></span>          
        </div>
    </div>
  )
}

export default Navbar