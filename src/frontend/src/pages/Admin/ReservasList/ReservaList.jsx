import { useEffect } from "react";
const ReservaList = ({ listarReservas, setListarReservas }) => {


    

    const actualizarLista= ()=>{
        fetch(`http://localhost:8080/api/v1/reservas`)
        .then(response=>response.json()).
        then(data=>setListarReservas(data));
        
    }
    

    useEffect(()=>{

        fetch(`http://localhost:8080/api/v1/reservas`)
        .then(response=>response.json()).
        then(data=>setListarReservas(data));
    
    
        
    },[listarReservas])
    



        
    
    
    return (
    <table className='containerTable' >
    <thead>
        <tr className='usersTable'>
        <th scope="col">Id</th>
        <th scope="col">Usuario</th>
        <th scope="col">Instrumento</th>
        <th scope="col">Categoria </th>
        <th scope="col">Fecha inicio</th>
        <th scope="col">Fecha final</th>
        </tr>
    </thead>
    <tbody >
        {listarReservas.map((reserva) => (
        <tr className='usersTable' key={reserva.id}>
            <td>{reserva.id}</td>
            <td>{reserva.usuario.nombre}</td>
            <td>{reserva.instrumento.nombre}</td>
            <td>{reserva.instrumento.categoria.nombre}</td>
            <td>{reserva.fechaInicio}</td>
            <td>{reserva.fechaDevolucion}</td>
            
        </tr>
        ))}
    </tbody>
    </table>
);
};

export default ReservaList