import { useState, useContext } from "react"
import { userContext } from "../../context/userContext";
import './datosUsuario.css'

const DatosUsuario = () => {
    const {user}= useContext(userContext);

    const [form, setForm] = useState({
        nombre:user.nombre,
        apellido:user.apellido,
        email:user.email ,
        ciudad:''
    })


    const onInputChange = ({target}) =>  {
        const { name , value} = target
        setForm( prevState => ({
            ...prevState ,
            [name]:value
        }))
    }

    const onHandleSubmit = (e) => {
        e.preventDefault();
    }



  return (
    <div className="datosContainer">
        <h2>Completa tus datos</h2>
    <div className="datosUsuario">
        <form onSubmit={onHandleSubmit}>
    <div className="containerInputs">

            <div className="containerInput">
            <label htmlFor="nombre">Nombre</label>
            <input 
                type="text" 
                id="nombre"
                placeholder='Nombre'
                name="nombre"
                value={user.nombre}
                disabled
                onChange={onInputChange}
            />
            </div>
            <div className="containerInput">
             <label htmlFor="apellido">Apellido</label>
            <input 
                type="text" 
                id="apellido"
                placeholder='Apellido'
                value={user.apellido}
                disabled
                name="apellido"
                onChange={onInputChange}
            />
            </div>
       </div>
    <div className="containerInputs">

        <div className="containerInput">
        <label htmlFor="email">Correo Electronico</label>
            <input 
                type="email" 
                id="nombre"
                placeholder='pitch@please.com'
                name="email"
                value={user.email}
                disabled
                onChange={onInputChange}
            />
               </div>
               <div className="containerInput">

               <label htmlFor="ciudad">Dirección</label>
            <input 
                type="email" 
                id="ciudad"
                placeholder='Dirección'
                name="ciudad"
                onChange={onInputChange}
            />
               </div>
    </div>
        </form>
    </div>
</div>
  )
}

export default DatosUsuario
