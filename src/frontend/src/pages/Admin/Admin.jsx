import { Link } from 'react-router-dom'
import './admin.css'
import { useState } from 'react'
import ProductoList from '../../Components/ProductoList/ProductoList'
import ProductoForm from './ProductoForm.jsx'

const Admin = () => {
  
  const [listarProductos, setListarProductos] = useState(null)
  const [crearProducto, setCrearProducto] = useState(null)

  const mostrarListaProductos = () => {
    setListarProductos(true)
    setCrearProducto(false)
  }

  const mostrarCrearProducto = () => {
    setCrearProducto(true)
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
            <Link className='product-button' to="editarprod"> {/* Que se pueda editar el producto desde aqui */}
                <button>Editar Producto</button>
            </Link>
        </div>
        {listarProductos && <ProductoList/>}
        {crearProducto && <ProductoForm/>}
    </section>
    </>
  )
}

export default Admin
