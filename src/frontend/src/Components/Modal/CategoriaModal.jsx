import { Box, Button, Modal, Typography } from '@mui/material'

const CategoriaModal = ({  open , closeModal ,  categoria , eliminarCategoria}) => {

    const [ categorias ]= categoria
    console.log(categorias);
    return (
        <>
            <Modal
        open={open}
        onClose={closeModal}
        aria-labelledby="user-modal-title"
        aria-describedby="user-modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, bgcolor: 'white', boxShadow: 24, p: 4, borderRadius: 8}}>
          <Typography variant="h6" component="h2" gutterBottom style={{ margin: '0px 0px 20px 40px' }}>
           CONFIRMACION DE ELIMINACION DE CATEGORIA
          </Typography>
          <div style={{ marginBottom: 12 }}>
          <Typography variant="body1" id="user-modal-description" gutterBottom style={{ margin: '0px 0px 12px 120px'}}>
           Estas a punto de eliminar la categoria
          </Typography>
          <Typography variant="body1" id="user-modal-description" gutterBottom style={{ margin: '0px 0px 10px 220px' , fontSize:'23px' , color:'red'}}>
          <strong>{categorias.nombre}</strong>
          </Typography>
          <Typography variant="body1" id="user-modal-description" gutterBottom style={{ margin: '0px 0px 12px 80px'}}>
          <strong>¿ Esta seguro que desea eliminar la categoria ? </strong>
          </Typography>
          <div style={{marginLeft:140}}>
            <Button onClick={ () => {eliminarCategoria(categorias.nombre , categorias.id) ; closeModal();}} style={{ color:'green' , fontSize:'18px' }}>Confirmar</Button>
            <Button  onClick={closeModal} style={{ color:'red' , fontSize:'18px' }}  >Cancelar</Button>
          </div>
          </div>
        </Box>
      </Modal>
        </>
    )
}

export default CategoriaModal
