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
import ReservaList from './ReservasList/ReservaList'
import CategoriaList from "./CategoriaList/CategoriaList"
//import { Redirect } from "react-router-dom";

const Admin = () => {
  

  const [listarProductos, setListarProductos] = useState([])
  const [crearProducto, setCrearProducto] = useState(false)
  const [editarProducto, setEditarProducto] = useState(null)
  const [listarUsuarios, setListarUsuarios] = useState([])
  const [eliminarCategoria, setEliminarCategoria] = useState(false)
  const [crearCategoria, setCrearCategoria] = useState(false)
  const [categoria, setCategoria] = useState([])
  const [listarReservas, setListarReservas] = useState([])
  const [listarCategoriasListado, setListarCategoriasListado] = useState([])


  //const navigate  = useNavigate()
  const context = useContext(userContext)
  const user = context.user
  const [mostrarListaUsuario, setMostrarListaUsuarios] = useState(false)

  


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
      setMostrarListaUsuarios(false)
      setCrearCategoria(false)
      setListarReservas([])
      setCategoria([])
      setListarCategoriasListado([])
      
  }catch(error){
      console.log(error);
  }
}

const listarCategorias = async() => {
  try{
    const response =   await fetch('http://localhost:8080/api/v1/categoria')
    const data = await response.json()
    setCategoria(data)
    setListarCategoriasListado(data)
    console.log(data);
  }catch(error){
    console.log(error);
  }

  }



  const listaReservas = async() => {
    try{
      const response =   await fetch('http://localhost:8080/api/v1/reservas')
      const data = await response.json()
      setListarReservas(data)
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
    setMostrarListaUsuarios(false)
    setCrearCategoria(false)
    setListarReservas([])
      setCategoria([])
  }

  const mostrarEditarProducto = () => {
    setEditarProducto(true)
    setCrearProducto(false)
    setListarProductos([])
    setListarUsuarios([])
    setEliminarCategoria(false)
    setMostrarListaUsuarios(false)
    setListarReservas([])
      setCategoria([])
      
  }

  const mostrarEliminarCategoria = () => {
    setEditarProducto(false)
    setCrearProducto(false)
    setListarProductos([])
    setListarUsuarios([])
    setEliminarCategoria(!eliminarCategoria)
    setMostrarListaUsuarios(false)
    setCrearCategoria(false)
    setListarReservas([])
    setListarCategoriasListado([])
  }

  const mostrarCrearCategoria = () => {
    setEditarProducto(false)
    setCrearProducto(false)
    setListarProductos([])
    setListarUsuarios([])
    setEliminarCategoria(false)
    setCrearCategoria(!crearCategoria)
    setListarReservas([])
    setCategoria([])
    setListarCategoriasListado([])
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
      setEliminarCategoria(false)
      setCrearCategoria(false)
      setListarReservas([])
      setCategoria([])
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
          <button className='user-button' onClick={listaReservas} >Listado Reservas</button>
          {/* <button className='user-button' >Reservas</button> */}
        </div>
        <h3 className='h3-admin'>Categorias</h3>
        <div className='buttons'>
          <button className='categ-button' onClick={mostrarCrearCategoria}>Crear Categoria</button>
          <button className='categ-button' onClick={ () => { mostrarEliminarCategoria(); listarCategorias();}}>Eliminar Categoria</button>
          <button className='categ-button' onClick={listarCategorias}>Listar Categoria</button>
        </div>
      
        {crearCategoria && <CrearCategoria/>}
        {listarCategoriasListado.length> 0 && <CategoriaList listarCategorias={listarCategoriasListado} setListarCategorias={setListarCategoriasListado}></CategoriaList>}
        {listarReservas.length> 0 && <ReservaList listarReservas={listarReservas} setListarReservas={setListarReservas}></ReservaList>}
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
