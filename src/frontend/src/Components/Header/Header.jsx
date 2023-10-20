// import { header } from "request/lib/hawk"
import logo from "../../assets/logoPitchPlease.png"



const Header = () => {
  return (
    <>
    <header className="headerContainer">
        <div className="logoContainer">

       
        <img src={logo} alt="" className="logo" />

        <h2 className="logoName">PitchPlease</h2>

        </div>

      <div className="menuContainer">
    <img src="" alt="menu hamburguesa" className="burgerMenu" />

    <a className="registerButton">Iniciar Sesión</a>

    <a className="registerButton">Crear Cuenta</a>
    </div>

    </header>

  
    

    </>
  )
}

export default Header