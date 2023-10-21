import './App.css'
import './Components/Header/header.css'
import Header from './Components/Header/Header'
import { Categorias } from './Components/Categorias/Categorias'
import { Buscador } from './Components/Buscador/Buscador'
import { Route, Routes } from 'react-router-dom'
import Admin from './pages/Admin/Admin'

function App() {

  return (
    <>
      <Header/>
      {/* <Buscador/> */}
      <Categorias/>
      <Routes>
        { /* <Route path="/" element={} /> */ }
        <Route path="/admin" element={<Admin/>} />
      </Routes>
    </>
  )
}

export default App
