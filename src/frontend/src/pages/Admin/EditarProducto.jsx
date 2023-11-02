import { useState } from 'react';
import "./editarproducto.css";

const EditarProducto = () => {
  const [producto, setProducto] = useState({
    nombre: '',
    
  });

  const InputChange = (e) => {
    const { name, value } = e.target;
    setProducto({
      ...producto,
      [name]: value,
    });
};

  const EditarProductoBuscar = () => {
    const nombreBuscado = producto.nombre;
    const categorias = [
      { id: 1, nombre: 'Producto 1' },
      { id: 2, nombre: 'Producto 2' },
      { id: 3, nombre: 'Producto 3' }, ];
      const productosEncontrados = categorias.filter((producto) =>
    producto.nombre.includes(nombreBuscado)
  );
  console.log('Productos encontrados:', productosEncontrados);
};
console.log('Producto a editar:', producto);


  return (
    <div className='editar-producto-container'>
      <h2>Buscar producto</h2>
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
       
        <button onClick={EditarProductoBuscar}>Buscar</button>
      </form>
    </div>
  );
};

export default EditarProducto;
