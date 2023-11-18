import { useEffect } from "react";
import { Navigate, Link } from "react-router-dom";

const ProductoList = ({ listarProductos, setListarProductos }) => {
    


    //const navigate = useNavigate();

    const actualizarLista= ()=>{
        fetch(`http://localhost:8080/api/v1/instrumentos`)
        .then(response=>response.json()).
        then(data=>setListarProductos(data));
    
    }


    // useEffect(()=>{

    //     fetch(`http://localhost:localhost/instrumentos`)
    //     .then(response=>response.json()).
    //     then(data=>setListarProductos(data));
    
    
        
    // },[listarProductos])


    // const editarProd = (id) => {        
    //     <Navigate to={{ pathname: "./EditarProducto/EditarProducto.jsx", state: { id } }}/>
        // fetch(`http://localhost:8080//api/v1/instrumentos/${id}`, {
        //     method: 'PUT',
        //     headers: {
        //     'Content-Type': 'application/json',
        //     },
        // });
        // actualizarLista();     
        
                
    
    const eliminarProd = (id) => {
        fetch(`http://localhost:8080//api/v1/instrumentos/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    
        });

        actualizarLista();
    };

    return (
    <table className='containerTable' >
    <thead>
        <tr className='usersTable'>
        <th scope="col">Id</th>
        <th scope="col">Nombre</th>        
        <th scope="col">Editar</th>
        <th scope="col">Eliminar</th>
        </tr>
    </thead>
    <tbody >
        {listarProductos.map((product) => (
        <tr className='usersTable' key={product.id}>
            <td>{product.id}</td>
            <td>{product.nombre}</td>
            
            <td>
            <Link to={`/editarprod/${product.id}`}>
                <button className="action_button">Editar</button>
            </Link>
            </td>
            <td>
                <button className="action_button"  onClick={() => eliminarProd(product.id)}>Eliminar</button>
            </td>
        </tr>
        ))}
    </tbody>
    </table>
);
};

export default ProductoList