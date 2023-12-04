import  { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useParams } from 'react-router';
import "./historialReserva.css"
import { Box } from '@mui/material'

const HistorialReserva = () => {
    const {userEmail} = useParams();
    const [reservas, setReservas] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedReserva, setSelectedReserva] = useState(null);

    useEffect(() => {
    
    const obtenerReservas = async () => {
        try {
        
        const response = await fetch(`http://localhost:8080/api/v1/reservas/usuario/${userEmail}`);
        
        
        if (response.ok) {
        
            const data = await response.json();
            
        
            setReservas(data);
        } else {
            console.error('Error al obtener las reservas');
        }
        } catch (error) {
        console.error('Error en la solicitud:', error);
        }
    };

    
    obtenerReservas();
    }, [userEmail]);

    const openModal = (reserva) => {
        setSelectedReserva(reserva);
        setModalIsOpen(true);
    };
    
    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <>
        <div className='contenedorHR'>
            <h2 className='tituloh2'>HISTORIAL DE RESERVAS</h2>        
            <div className='reservasContainer' >
                {reservas.map((reserva) => (
                    <div key={reserva.id} className='reservasCard'>
                        <p className="reservaInfo"><span className="boldText">Nro ID:</span> {reserva.id}</p>
                        <p className="reservaInfo"><span className="boldText">Instrumento:</span> {reserva.instrumento.nombre}</p>
                        <p className="reservaInfo"><span className="boldText">Fecha de inicio:</span> {reserva.fechaInicio}</p>
                        <button className="verDetallesBtn" onClick={() => openModal(reserva)}>Ver Detalles</button>
                    </div>
                ))}
            </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Detalles de la Reserva"
            >
            {selectedReserva && (
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: "auto", bgcolor: 'white', boxShadow: 24, p: 4, borderRadius: 8}}>
                    <h3>Detalles de la Reserva</h3>
                    <p className="reservaDet">Nro Id: {selectedReserva.id}</p>
                    <p className="reservaDet">Instrumento: {selectedReserva.instrumento.nombre}</p>
                    <p className="reservaDet">Fecha de inicio: {selectedReserva.fechaInicio}</p>
                    <p className="reservaDet">Fecha de finalización: {selectedReserva.fechaDevolucion}</p>
                    <p className="reservaDet">Precio: {selectedReserva.instrumento.precio}</p>
                    <button className='cerrarBtn' onClick={closeModal}>Cerrar</button>
                </Box>
                )}
            </Modal>
        
        </>
    );
};

export default HistorialReserva;
