import './App.css'
import './Components/Header/header.css'
import Header from './Components/Header/Header'
import Footer from "./Components/Footer/Footer"
import { Route, Routes } from 'react-router-dom'
import Admin from './pages/Admin/Admin'
import Home from './routes/Home/Home'
import Producto from './routes/Producto/Producto'
import Login from './routes/Login/Login'
import SignUp from './routes/SignUp/SignUp'
import SignUpAdm from './routes/SignUpAdm/SignUpAdm'
import UserContextProvider from './context/userContext'
import EditarProducto from './pages/Admin/EditarProducto/EditarProducto'
import Reservas from './routes/Reservas/Reservas'


function App() {

  return (
    <UserContextProvider>
      <>
        <Header/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/signupadm' element={<SignUpAdm/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/reservas/:productoId" element={<Reservas/>}/>
          <Route path="producto/:productoId" element={<Producto/>}/>
          <Route path="/editarprod/:id" element={<EditarProducto/>} />
          <Route path='*' element={<h2>Page Not Found</h2>}/>
        </Routes>
        <Footer/>
      </>
    </UserContextProvider>
  )
}

export default App
