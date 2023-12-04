import { Modal, Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const UserModal = ({ isOpen, closeModal, user }) => {
  const isAdmin = user.rol === 'ROLE_ADMIN';
  const isUsuario =user.rol === 'ROLE_USUARIO'
    return (
        <>
            <Modal
        open={isOpen}
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
          <Button onClick={closeModal} variant="contained" >Cerrar</Button>
          {isAdmin && (
            <Link to="/admin">
              <Button onClick={closeModal} variant="contained" style={{ marginLeft: 8 }}>Administración</Button>
            </Link>
          )}
          {isUsuario && (
            <Link to={`/historial/${user.email}`}>
              <Button onClick={closeModal} variant="contained" style={{ marginLeft: 8 }}>Historial</Button>
            </Link>
          )}
          </Box>
        </Box>
      </Modal>
        </>
    )
}

export default UserModal