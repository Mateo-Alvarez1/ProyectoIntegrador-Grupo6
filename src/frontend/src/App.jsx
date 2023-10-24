import './App.css'
import './Components/Header/header.css'
import Header from './Components/Header/Header'
import Footer from "./Components/Footer/Footer"
import { Route, Routes } from 'react-router-dom'
import Admin from './pages/Admin/Admin'
import Home from './routes/Home/Home'


function App() {

  return (
    <>


      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/> 
        <Route path="admin" element={<Admin/>}/>
        <Route path='*' element={<h2>Page Not Found</h2>}/>
      </Routes>
     
      <Footer/>

    </>
  )
}

export default App
