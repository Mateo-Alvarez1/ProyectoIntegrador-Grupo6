
import { useState } from 'react'
import './eliminarCategoria.css'
import CategoriaModal from '../../../Components/Modal/CategoriaModal';
const EliminarCategoria = ({setCategoria , categoria}) => {
    
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };


    
      
      const eliminarCategoria = async( nombre , id) => {
        try {
          const response = await fetch(`http://localhost:8080/api/v1/categoria/${id}/${nombre}` , {
            method:'DELETE',
            headers:{
              'Content-Type':'Application/json'
            }
          })
          setCategoria((prevCategoria) => prevCategoria.filter((cat) => cat.id !== id));

        if(response.ok){
          console.log("categoria eliminada correctamente");
        }
        
      } catch (error) {
        console.log(error);
      }

    }



  return (  
      <div  className='eliminarCategorias'>
       {categoria.length > 0 ? (
        <div>
          {categoria.map((categoria) => (
            <div key={categoria.id} className='categoria'>
              <p>{categoria.nombre}</p>
              <button onClick={() => openModal()}>Eliminar</button>
           </div>
          ))}
        </div>
      ) : (
        <p className='categoriasP' >No hay categorías disponibles</p>
      )}
          { isModalOpen && <CategoriaModal open={isModalOpen} closeModal={closeModal} categoria={categoria} eliminarCategoria={eliminarCategoria}/>}
    </div>
   
  )
}

export default EliminarCategoria
