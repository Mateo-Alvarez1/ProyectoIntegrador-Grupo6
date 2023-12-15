import { useEffect } from "react";
const UsuarioList = ({ listarUsuarios, setListarUsuarios }) => {


    

    const actualizarLista= ()=>{
        fetch(`http://3.89.202.193:8080/api/v1/usuarios/listar`)
        .then(response=>response.json()).
        then(data=>setListarUsuarios(data));
        
    }
    

    useEffect(()=>{

        fetch(`http://3.89.202.193:8080/api/v1/usuarios/listar`)
        .then(response=>response.json()).
        then(data=>setListarUsuarios(data));
    
    
        
    },[listarUsuarios])
    

    const agregarRol = (email) => {
        fetch(`http://3.89.202.193:8080/api/v1/auth/asignar/${email}`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
        });
        actualizarLista();

        
        
            
                };
    
    const quitarRol = (email) => {
        fetch(`http://3.89.202.193:8080/api/v1/auth/quitar/${email}`, {
        method: 'POST',
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
        <th scope="col">Apellido</th>
        <th scope="col">Email</th>
        <th scope="col">Rol</th>
        <th scope="col">Agregar Rol</th>
        <th scope="col">Quitar Rol</th>
        </tr>
    </thead>
    <tbody >
        {listarUsuarios.map((user) => (
        <tr className='usersTable' key={user.id}>
            <td>{user.id}</td>
            <td>{user.nombre}</td>
            <td>{user.apellido}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
                <button className="role_button" onClick={() => agregarRol(user.email)}>Agregar Rol</button>
            </td>
            <td>
                <button className="role_button"  onClick={() => quitarRol(user.email)}>Quitar Rol</button>
            </td>
        </tr>
        ))}
    </tbody>
    </table>
);
};

export default UsuarioList