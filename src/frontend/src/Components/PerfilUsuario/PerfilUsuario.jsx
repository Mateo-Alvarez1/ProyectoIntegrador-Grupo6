import { useContext} from "react"
import { userContext } from "../../context/userContext"
import logo from '../../assets/ppl.png'
import arrow from "../../assets/arrow.svg";
import styles from './PerfilUsuario.module.css'
import { Navigate, useNavigate } from "react-router-dom";
const PerfilUsuario = () => {

    const navigate = useNavigate()
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
        <p onClick={() => navigate(-1)} className='textArrow' style={{cursor: "pointer"}}>
          Volver para atrás <img src={arrow} alt="" />
        </p>
      </div>
        <div className={styles.userContainer}>
            <div>
                <img src={logo} width={250} />
            </div>
            <div className={styles.dataContainer}>
                <div className={styles.row}>
                <label>
                    Nombre: 
                    <input type="text" id="nombre" value={`${user.nombre}`} disabled/>
                </label>
                <label>
                    Apellido: 
                    <input type="text" id="apellido" value={`${user.apellido}`} disabled/>
                </label>
                </div>
                <div className={styles.row}>
                    <label>
                        Email: 
                        <input type="text" id="nombre" value={`${user.email}`} disabled/>
                    </label>
                    <label>
                        Rol: 
                        <input type="text" id="nombre" value={`${user.rol}`} disabled/>
                    </label>
                </div>
            </div>
        </div>
    </>
  )
}

export default PerfilUsuario