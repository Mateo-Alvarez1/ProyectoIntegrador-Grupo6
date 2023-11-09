
//import { useState } from "react";

const UsuarioList = ({ listarUsuarios }) => {

    const agregarRol = () => {
        fetch("http://localhost:8080//api/v1/auth/asignar", {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            rol: 'ROLE_ADMIN',
            }),
        });
            
                };
    
    const quitarRol = () => {
        fetch(`http://localhost:8080/api/v1/aut/quitar`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    
        });
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
            <td>{user.rol}</td>
            <td>
                <button onClick={() => agregarRol}>Agregar Rol</button>
            </td>
            <td>
                <button onClick={() => quitarRol}>Quitar Rol</button>
            </td>
        </tr>
        ))}
    </tbody>
    </table>
);
};

export default UsuarioList;


// listadoUsuario() {
// // Obtener el listado de usuarios
// fetch(`http://localhost:8080/api/v1/userlistado`)
//     .then((response) => response.json())
//     .then((usuarios) => {
//     this.setListUsuario({ usuarios });
//     });
// }

// function agregarAdministrador(usuario) {
// // Realizar la petición HTTP
// axios.post("http://localhost:8080/api/v1/user", {
//     idUsuario: usuario.id,
//     role: "administrador",
// })
//     .then((response) => {
//     // Actualizar el estado del usuario
//     usuario.esAdministrador = true;
//     // Actualizar el estado del componente
//     this.setState({ usuarios: [...this.state.usuarios, usuario] });
//     })
//     .catch((error) => {
//         setError(error);
//     });
// }

// quitarAdministrador(usuario) {
// // Realizar la petición HTTP
// axios.delete("/api/roles/" + usuario.id)
//     .then((response) => {
//     // Actualizar el estado del usuario
//     usuario.esAdministrador = false;
//     // Actualizar el estado del componente
//     this.setState({ usuarios: this.state.usuarios.filter((user) => user !== usuario) });
//     })
//     .catch((error) => {
    
//     setError(error);
//     });

    
// }

// render() {
// const { usuarios } = this.state;
// return (
//     <List>
//     {usuarios.map((usuario) => (
//         <div key={usuario.id}>
//         <ListItem key={usuario.id}>
//             <span>{usuario.nombre}</span>
//             <span>{usuario.apellido}</span>
//         </ListItem>
//         <div>
//             {usuario.esAdministrador ? (
//             <Button onClick={() => this.quitarAdministrador(usuario)}>
//                 Quitar administrador
//             </Button>
//             ) : (
//             <Button onClick={() => this.agregarAdministrador(usuario)}>
//                 Agregar administrador
//             </Button>
//             )}
//         </div>
//         </div>
//     ))}
//     </List>
// );
// }
