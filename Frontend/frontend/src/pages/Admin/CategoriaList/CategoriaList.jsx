import { useEffect } from "react";
const ReservaList = ({ listarCategorias, setListarCategorias }) => {


    

    const actualizarLista= ()=>{
        fetch(`http://3.89.202.193:8080/api/v1/categoria`)
        .then(response=>response.json()).
        then(data=>setListarCategorias(data));
        
    }
    

    useEffect(()=>{

        fetch(`http://3.89.202.193:8080/api/v1/categoria`)
        .then(response=>response.json()).
        then(data=>setListarCategorias(data));
    
    
        
    },[listarCategorias])
    



        
    
    
    return (
    <table className='containerTable' >
    <thead>
        <tr className='usersTable'>
        <th scope="col">Id</th>
        <th scope="col">Nombre</th>
        </tr>
    </thead>
    <tbody >
        {listarCategorias.map((categoria) => (
        <tr className='usersTable' key={categoria.id}>
            <td>{categoria.id}</td>
            <td>{categoria.nombre}</td>
        </tr>
        ))}
    </tbody>
    </table>
);
};

export default ReservaList