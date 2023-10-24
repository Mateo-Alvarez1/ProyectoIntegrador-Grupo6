import { Link } from 'react-router-dom'
import './admin.css'

const Admin = () => {
  return (
    <>
    <div className='responsive-warning'>¡Oops! Esta página no está disponible para dispositivos móviles.</div>
    <section className='admin-body'>
        <h2 className='admin-title'>Administración</h2>
        <p className='admin-p'>¿Qué quieres hacer hoy?</p>
        <div className='buttons'>
            <Link className='add-product-button' to=""> {/* acá va el componente para agregar producto */}
                <button>Crear Producto</button>
            </Link>
            <button disabled className='unavailable-button'>Editar Producto</button>
            <button disabled className='unavailable-button'>Eliminar Producto</button>
        </div>
    </section>
    </>
  )
}

export default Admin