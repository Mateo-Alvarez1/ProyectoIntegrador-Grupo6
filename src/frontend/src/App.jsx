import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './Components/Header/header.css'
import Header from './Components/Header/Header'
import { Categorias } from './Components/Categorias/Categorias'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <Categorias/>
    </>
  )
}

export default App
