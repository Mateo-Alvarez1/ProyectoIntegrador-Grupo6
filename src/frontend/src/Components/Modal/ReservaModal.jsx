import { Box, Button, Modal, Typography } from '@mui/material';


const ReservaModal = ({ open, closeModal, error }) => {
  return (
    <>
      <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="user-modal-title"
        aria-describedby="user-modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, bgcolor: 'white', boxShadow: 24, p: 4, borderRadius: 8 }}>
          <Typography variant="h6" component="h2" gutterBottom style={{ margin: '0px 40px 20px 40px', textAlign:'center' }}>
            ERROR: {error}
          </Typography>
          <div style={{ marginBottom: 12 }}>
            <Typography variant="body1" id="user-modal-description" gutterBottom style={{ margin: '0px 20px 12px 20px', textAlign:'center' }}>
              Por favor seleccionar una fecha valida
            </Typography>
            <div style={{ marginLeft: 140, marginRight:140 }}>
              <Button onClick={closeModal} style={{ color: 'red', fontSize: '18px', textAlign:'center', marginLeft:96, marginRight:96 }}>Ok</Button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default ReservaModal;
