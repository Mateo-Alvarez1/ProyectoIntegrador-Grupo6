import './admin.css'
import { useState, useEffect } from 'react'
import ProductoList from './ProductoList/ProductoList'
import ProductoForm from './ProductoForm/ProductoForm.jsx'
import EditarProducto from './EditarProducto/EditarProducto.jsx'
import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { userContext } from '../../context/userContext.jsx'
import UsuarioList from './UsuarioList/UsuarioList.jsx'
import EliminarCategoria from './EliminarCategoria/EliminarCategoria.jsx'
import CrearCategoria from './CrearCategoria/CrearCategoria.jsx'
//import { Redirect } from "react-router-dom";

const Admin = () => {
  

  const [listarProductos, setListarProductos] = useState([])
  const [crearProducto, setCrearProducto] = useState(false)
  const [editarProducto, setEditarProducto] = useState(null)
  const [listarUsuarios, setListarUsuarios] = useState([])
  const [eliminarCategoria, setEliminarCategoria] = useState(false)
  const [crearCategoria, setCrearCategoria] = useState(false)
  const [categoria, setCategoria] = useState([])


  //const navigate  = useNavigate()
  const context = useContext(userContext)
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
      setEliminarCategoria(false)
  }catch(error){
      console.log(error);
  }
}

const listarCategorias = async() => {
  try{
    const response =   await fetch('http://localhost:8080/api/v1/categoria')
    const data = await response.json()
    setCategoria(data)
    console.log(data);
  }catch(error){
    console.log(error);
  }

  }


  const mostrarCrearProducto = () => {
    setCrearProducto(!crearProducto)
    setListarProductos([])
    setEditarProducto(false)
    setListarUsuarios([])
    setEliminarCategoria(false)
  }

  const mostrarEditarProducto = () => {
    setEditarProducto(true)
    setCrearProducto(false)
    setListarProductos([])
    setListarUsuarios([])
    setEliminarCategoria(false)
  }

  const mostrarEliminarCategoria = () => {
    setEditarProducto(false)
    setCrearProducto(false)
    setListarProductos([])
    setListarUsuarios([])
    setEliminarCategoria(!eliminarCategoria)
  }

  const mostrarCrearCategoria = () => {
    setEditarProducto(false)
    setCrearProducto(false)
    setListarProductos([])
    setListarUsuarios([])
    setEliminarCategoria(false)
    setCrearCategoria(!crearCategoria)
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
        <h3 className='h3-admin'>Productos</h3>
        <div className='buttons'>            
            <button onClick={productData} className='product-button'>Listar Productos</button>
            <button onClick={mostrarCrearProducto} className='product-button'>Crear Producto</button>
            <button onClick={mostrarEditarProducto} className='product-button'>Editar Producto</button>
        </div>
        <h3 className='h3-admin'>Usuarios/Reservas</h3>
        <div className='buttons'>        
          <button className='user-button' onClick={userData}>Mostrar Usuarios</button>
          <button className='user-button' >Listado Reservas</button>
          <button className='user-button' >Reservas</button>
        </div>
        <h3 className='h3-admin'>Categorias</h3>
        <div className='buttons'>
          <button className='categ-button' onClick={mostrarCrearCategoria}>Crear Categoria</button>
          <button className='categ-button' >Listar Categoria</button>
          <button className='categ-button' onClick={ () => { mostrarEliminarCategoria(); listarCategorias();}}>Eliminar Categoria</button>
        </div>
      
        {crearCategoria && <CrearCategoria/>}
        {eliminarCategoria && <EliminarCategoria categoria={categoria} setCategoria={setCategoria} />}
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
