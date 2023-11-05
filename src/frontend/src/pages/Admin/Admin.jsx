import './admin.css'
import { useState } from 'react'
import ProductoList from '../../Components/ProductoList/ProductoList'
import ProductoForm from './ProductoForm/ProductoForm.jsx'
import EditarProducto from './EditarProducto/EditarProducto.jsx'

const Admin = () => {
  
  const [listarProductos, setListarProductos] = useState(null)
  const [crearProducto, setCrearProducto] = useState(null)
  const [editarProducto, setEditarProducto] = useState(null)
  // const [listarUsuarios, setListarUsuarios] = useState(null)

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
          <button className='product-button'>Mostrar Usuarios</button>
        </div>
        {listarProductos && <ProductoList/>}
        {crearProducto && <ProductoForm/>}
        {editarProducto && <EditarProducto/>}
    </section>
    </>
  )
}

export default Admin
