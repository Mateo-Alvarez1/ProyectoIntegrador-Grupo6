import axios from "axios";
import { useState } from "react";

const UsuariosList=()=> {
const [listUsuario, setListUsuario] = useState([]);
const [error, setError] = useState("");


listadoUsuario() {
// Obtener el listado de usuarios
fetch(`http://localhost:8080/api/v1/userlistado`)
    .then((response) => response.json())
    .then((usuarios) => {
    this.setListUsuario({ usuarios });
    });
}

function agregarAdministrador(usuario) {
// Realizar la petición HTTP
axios.post("http://localhost:8080/api/v1/user", {
    idUsuario: usuario.id,
    role: "administrador",
})
    .then((response) => {
    // Actualizar el estado del usuario
    usuario.esAdministrador = true;
    // Actualizar el estado del componente
    this.setState({ usuarios: [...this.state.usuarios, usuario] });
    })
    .catch((error) => {
        setError(error);
    });
}

quitarAdministrador(usuario) {
// Realizar la petición HTTP
axios.delete("/api/roles/" + usuario.id)
    .then((response) => {
    // Actualizar el estado del usuario
    usuario.esAdministrador = false;
    // Actualizar el estado del componente
    this.setState({ usuarios: this.state.usuarios.filter((user) => user !== usuario) });
    })
    .catch((error) => {
    
    setError(error);
    });

    
}





render() {
const { usuarios } = this.state;
return (
    <List>
    {usuarios.map((usuario) => (
        <div key={usuario.id}>
        <ListItem key={usuario.id}>
            <span>{usuario.nombre}</span>
            <span>{usuario.apellido}</span>
        </ListItem>
        <div>
            {usuario.esAdministrador ? (
            <Button onClick={() => this.quitarAdministrador(usuario)}>
                Quitar administrador
            </Button>
            ) : (
            <Button onClick={() => this.agregarAdministrador(usuario)}>
                Agregar administrador
            </Button>
            )}
        </div>
        </div>
    ))}
    </List>
);
}
}

export default ListaUsuarios;