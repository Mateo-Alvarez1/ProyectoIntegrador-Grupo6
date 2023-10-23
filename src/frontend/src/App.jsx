import './App.css'
import './Components/Header/header.css'
import Header from './Components/Header/Header'
import { Route, Routes } from 'react-router-dom'
import Home from './routes/Home/Home'

function App() {

  return (
    <>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/> 
        <Route path='*' element={<h2>Page Not Found</h2>}/>
      </Routes>
    </>
  )
}

export default App
