import { useState, useEffect } from 'react';
import "./editarproducto.css";
import { useParams } from 'react-router-dom';

const EditarProducto = () => {
  const { id } = useParams();
  console.log(id);
  const [producto, setProducto] = useState({
    nombre: "",
    categoria: "",
    precio: ""
    
  });

  useEffect(() => {
    
    const ModProducto = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/v1/instrumentos/${id}`);
        const data = await response.json();

        
        setProducto({
          id: data.id,
          nombre: data.nombre,
          categoria: data.categoria.nombre ,
          precio: data.precio
        });
      } catch (error) {
        console.error('Error al obtener la información del producto', error);
      }
    };

    
    ModProducto();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto((producto) => ({
      ...producto,
      [name]: value,
    }));
  };

  const handleEditSubmit = async () => {
    
    try {
      await fetch(`http://localhost:8080/api/v1/instrumentos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(producto),
      });

      
    } catch (error) {
      console.error('Error al actualizar el producto', error);
    }
  };

return (
  <div >
    
    <form className='editar-producto-form'>
    <h2 className='h2-edit'>Editar Producto</h2>
      <label className='label-form'>ID:</label>
      <input className='input-form' type="text" value={producto.id} />

      <label className='label-form'>NOMBRE:</label>
      <input className='input-form'type="text" value={producto.nombre} />

      
      
        <label className='label-form'>Categoria:</label>
        <input
          className='input-form'
          type="text"
          name="categoria"
          value={producto.categoria}
          onChange={handleChange}
        />
      

      
        <label className='label-form'>Precio:</label>
        <input
          className='input-form'
          type="text"
          name="precio"
          value={producto.precio}
          onChange={handleChange}
        />
      

      <button className= 'button-edit'onClick={handleEditSubmit}>Editar</button>
    </form>
  </div>
);
};

export default EditarProducto;

//   const EditarProductoBuscar = () => {
//     const nombreBuscado = producto.nombre;
//     const categorias = [
//       { id: 1, nombre: 'Producto 1' },
//       { id: 2, nombre: 'Producto 2' },
//       { id: 3, nombre: 'Producto 3' }, ];
//       const productosEncontrados = categorias.filter((producto) =>
//     producto.nombre.includes(nombreBuscado)
//   );
//   console.log('Productos encontrados:', productosEncontrados);
// };
// console.log('Producto a editar:', producto);

//   return (
//     <div className='editar-producto-container'>
//       <h2>Buscar producto</h2>
//       <form>
//         <div className='input-container'>
//           <label>Nombre:</label>
//           <input
//             type="text"
//             name="nombre"
//             value={producto.nombre}
//             onChange={InputChange}
//           />
//         </div>
      
//         <button onClick={EditarProductoBuscar}>Buscar</button>
//       </form>
//     </div>
//   );
// };

