import './admin.css'
import { useState, useEffect } from 'react'
import ProductoList from './ProductoList/ProductoList'
import ProductoForm from './ProductoForm/ProductoForm.jsx'
import EditarProducto from './EditarProducto/EditarProducto.jsx'
import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { userContext } from '../../context/userContext.jsx'
import UsuarioList from './UsuarioList/UsuarioList.jsx'


const Admin = () => {
  

  const [listarProductos, setListarProductos] = useState([])
  const [crearProducto, setCrearProducto] = useState(null)
  const [editarProducto, setEditarProducto] = useState(null)
  const [listarUsuarios, setListarUsuarios] = useState([])  
  const context = useContext(userContext)
  const token = context.userjwt
  const user = context.user
  const [mostrarListaUsuario, setMostrarListaUsuarios] = useState(null)

  


  const productData=async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/instrumentos`)
      const data = await response.json();
      console.log(data);
      setListarUsuarios([])
      setEditarProducto(false)
      setCrearProducto(false)
      setListarProductos(data)
      setMostrarListaUsuarios(false)
      
  }catch(error){
      console.log(error);
  }
}


  

  const mostrarCrearProducto = () => {
    setCrearProducto(true)
    setListarProductos([])
    setEditarProducto(false)
    setListarUsuarios([])
    setMostrarListaUsuarios(false)
    
  }

  const mostrarEditarProducto = () => {
    setEditarProducto(true)
    setCrearProducto(false)
    setListarProductos([])
    setListarUsuarios([])
    setMostrarListaUsuarios(false)
    
  }

  const userData=async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/usuarios/listar`)
      const data = await response.json();
      console.log(data);
      setListarUsuarios(data)
      setEditarProducto(false)
      setCrearProducto(false)
      setListarProductos([])
      setMostrarListaUsuarios(true)
      
  }catch(error){
      console.log(error);
  }
}
  if(user.rol !== "ROLE_ADMIN"){
    
    return <Navigate to="/"/>
    
    
  }

  return (
    <>    
    <div className='responsive-warning'>¡Oops! Esta página no está disponible para dispositivos móviles.</div>
    <section className='admin-body'>
        <h2 className='admin-title'>Administración</h2>
        <p className='admin-p'>¿Qué quieres hacer hoy?</p>
        <div className='buttons'>
            <button onClick={productData} className='product-button'>Listar Productos</button>
            <button onClick={mostrarCrearProducto} className='product-button'>Crear Producto</button>
            <button onClick={mostrarEditarProducto} className='product-button'>Editar Producto</button>
        </div>
        <div className='buttons'>
          <button className='product-button' onClick={userData}>Mostrar Usuarios</button>
        </div>
        {listarProductos.length > 0 && <ProductoList listarProductos= {listarProductos} setListarProductos={setListarProductos}/>}
        {crearProducto && <ProductoForm/>}
        {editarProducto && <EditarProducto/>}
        {listarUsuarios.length > 0 && mostrarListaUsuario && <UsuarioList listarUsuarios= {listarUsuarios} setListarUsuarios={setListarUsuarios}/>}
        {!listarProductos && !crearProducto && !editarProducto && !(listarUsuarios) && (
    <div style={{ marginBottom: '362px' }}>

    </div>
        )}
    </section> 
      
      
    </>
  );
      }

export default Admin
