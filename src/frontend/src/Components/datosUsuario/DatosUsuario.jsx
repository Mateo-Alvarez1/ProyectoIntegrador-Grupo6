import { useState } from "react"
import './datosUsuario.css'

const DatosUsuario = () => {
    const [form, setForm] = useState({
        nombre:'',
        apellido:'',
        email:'' ,
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
                onChange={onInputChange}
            />
            </div>
            <div className="containerInput">
             <label htmlFor="apellido">Apellido</label>
            <input 
                type="text" 
                id="apellido"
                placeholder='Apellido'
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
                onChange={onInputChange}
            />
               </div>
               <div className="containerInput">

               <label htmlFor="ciudad">Ciudad</label>
            <input 
                type="email" 
                id="ciudad"
                placeholder='Ciudad o Provincia'
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
