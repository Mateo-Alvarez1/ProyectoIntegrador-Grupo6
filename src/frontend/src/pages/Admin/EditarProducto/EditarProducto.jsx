import { useState } from 'react';
import "./editarproducto.css";

const EditarProducto = ({location}) => {
  const { id } = location.state;
  const [producto, setProducto] = useState({
    nombre: '',
    categoria: '',
    precio: ''
    
  });

  const InputChange = (e) => {
    const { name, value } = e.target;
    setProducto({
      ...producto,
      [name]: value,
    });
};

const handleEditSubmit = async (e) => {
  e.preventDefault();


  const url = `http://localhost:8080//api/v1/instrumentos/${id}`;
  const body = JSON.stringify({
    nombre: producto.nombre,
    categoria: producto.categoria,
  });

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body,
  });

  if (response.ok) {
    console.log("El producto se editó correctamente");
  } else {
    console.log("Ocurrió un error al editar el producto");
  }
};

return (
  <div className='editar-producto-container'>
    <form>
      <div className='input-container'>
        <label>Nombre:</label>
        <input
          type="text"
          name="nombre"
          value={producto.nombre}
          onChange={InputChange}
        />
      </div>

      <div className='input-container'>
        <label>Categoria:</label>
        <input
          type="text"
          name="categoria"
          value={producto.categoria}
          onChange={InputChange}
        />
      </div>

      <div className='input-container'>
        <label>Precio:</label>
        <input
          type="text"
          name="precio"
          value={producto.precio}
          onChange={InputChange}
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

