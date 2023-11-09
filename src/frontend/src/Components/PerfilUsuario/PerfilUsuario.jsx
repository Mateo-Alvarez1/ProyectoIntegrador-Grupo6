import { useContext} from "react"
import { userContext } from "../../context/userContext"
import logo from '../../assets/ppl.png'
import arrow from "../../assets/arrow.svg";
import styles from './PerfilUsuario.module.css'
import { Link, Navigate } from "react-router-dom";
const PerfilUsuario = () => {

    const userContextResults = useContext(userContext)
    const token = userContextResults.userJwt;

    if (token == null) {
        return <Navigate to='/'/>
    }

    const user = userContextResults.user;

  return (
    <>
        <div className='subHeader'>
        <h2>Tu Perfil:</h2>
        <Link to="/" className='textArrow'>
          Volver para atrás <img src={arrow} alt="" />
        </Link>
      </div>
        <div className={styles.userContainer}>
            <div>
                <img src={logo} width={250} />
            </div>
            <div>
                <label>
                    Nombre: 
                    <input type="text" id="nombre" value={`${user.nombre}`} disabled/>
                </label>
                <label>
                    Apellido: 
                    <input type="text" id="apellido" value={`${user.apellido}`} disabled/>
                </label>
                <label>
                    Email: 
                    <input type="text" id="nombre" value={`${user.email}`} disabled/>
                </label>
                <p>Rol: {user.rol}</p>
            </div>
        </div>
    </>
  )
}

export default PerfilUsuario