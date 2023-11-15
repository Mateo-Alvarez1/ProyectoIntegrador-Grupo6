import { Modal, Box, Typography, Button } from '@mui/material';

const UserModal = ({ isOpen, closeModal, user }) => {
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
          <Button onClick={closeModal} variant="contained">Cerrar</Button>
        </Box>
      </Modal>
        </>
    )
}

export default UserModal