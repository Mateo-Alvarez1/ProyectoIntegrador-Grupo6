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
  <div className='editar-producto-container'>
    <h2>Editar Producto</h2>
    <form>
      <label>ID:</label>
      <input type="text" value={producto.id} />

      <label>NOMBRE:</label>
      <input type="text" value={producto.nombre} />

      
      <div className='input-container'>
        <label>Categoria:</label>
        <input
          type="text"
          name="categoria"
          value={producto.categoria}
          onChange={handleChange}
        />
      </div>

      <div className='input-container'>
        <label>Precio:</label>
        <input
          type="text"
          name="precio"
          value={producto.precio}
          onChange={handleChange}
        />
      </div>

      <button onClick={handleEditSubmit}>Editar</button>
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

