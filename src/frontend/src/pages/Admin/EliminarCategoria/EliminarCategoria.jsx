import { useState } from 'react'
import './eliminarCategoria.css'
import CategoriaModal from '../../../Components/Modal/CategoriaModal';

const EliminarCategoria = ({setCategoria , categoria}) => {
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
    //const [isModalOpen, setIsModalOpen] = useState(false);

    // const openModal = () => {
    //   setIsModalOpen(true);
    // };
  
    // const closeModal = () => {
    //   setIsModalOpen(false);
    // };
    const openModal = (categoria) => {
      setCategoriaSeleccionada(categoria);
    };
  
    const closeModal = () => {
      setCategoriaSeleccionada(null);
    };

    
      
      const eliminarCategoria = async( nombre , id) => {
        try {
          const response = await fetch(`http://3.89.202.193:8080/api/v1/categoria/${id}/${nombre}` , {
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
          {categoria.map((category) => (
            <div key={category.id} className='categoria'>
              <p>{category.nombre}</p>
              <button onClick={() => openModal(category)}>Eliminar</button>
            </div>
          ))}
        </div>
      ) : (
        <p className='categoriasP' >No hay categorí­as disponibles</p>
      )}
          { categoriaSeleccionada && (
          <CategoriaModal 
          open={true} 
          closeModal={closeModal} 
          categoria={[categoriaSeleccionada]} 
          eliminarCategoria={eliminarCategoria}/>
          )}
    </div>
  
  )
}

export default EliminarCategoria