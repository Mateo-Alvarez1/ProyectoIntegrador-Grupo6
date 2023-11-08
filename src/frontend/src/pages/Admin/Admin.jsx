import './admin.css'
import { useState } from 'react'
import ProductoList from '../../Components/ProductoList/ProductoList'
import ProductoForm from './ProductoForm/ProductoForm.jsx'
import EditarProducto from './EditarProducto/EditarProducto.jsx'

const Admin = () => {
  
  const [listarProductos, setListarProductos] = useState(null)
  const [crearProducto, setCrearProducto] = useState(null)
  const [editarProducto, setEditarProducto] = useState(null)
  const [listarUsuarios, setListarUsuarios] = useState([])


  const mostrarListaProductos = () => {
    setListarProductos(true)
    setCrearProducto(false)
    setEditarProducto(false)
  }

  const mostrarCrearProducto = () => {
    setCrearProducto(true)
    setListarProductos(false)
    setEditarProducto(false)
  }

  const mostrarEditarProducto = () => {
    setEditarProducto(true)
    setCrearProducto(false)
    setListarProductos(false)
  }

  const userData=async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/usuarios/listar`)
      const data = await response.json();
      console.log(data);
      setListarUsuarios(data)
  }catch(error){

  }
}


  return (
    <>
    <div className='responsive-warning'>¡Oops! Esta página no está disponible para dispositivos móviles.</div>
    <section className='admin-body'>
        <h2 className='admin-title'>Administración</h2>
        <p className='admin-p'>¿Qué quieres hacer hoy?</p>
        <div className='buttons'>
            <button onClick={mostrarListaProductos} className='product-button'>Listar Productos</button>
            <button onClick={mostrarCrearProducto} className='product-button'>Crear Producto</button>
            <button onClick={mostrarEditarProducto} className='product-button'>Editar Producto</button>
        </div>
        <div className='buttons'>
          <button className='product-button' onClick={userData}>Mostrar Usuarios</button>
        </div>
        {listarProductos && <ProductoList/>}
        {crearProducto && <ProductoForm/>}
        {editarProducto && <EditarProducto/>}
    </section>
    {
      listarUsuarios.length > 0 &&
      <table className='containerTable' >
        <thead>
          <tr className='usersTable'>
            <th scope="col">Id</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">Email</th>
            <th scope="col">Rol</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    }

    
    </>
  )
}

export default Admin
