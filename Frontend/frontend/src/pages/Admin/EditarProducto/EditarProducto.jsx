import { useState, useEffect } from "react";
import "./editarproducto.css";
import { useParams } from "react-router-dom";
import { Alert } from "@mui/material";
import { ScaleLoader } from "react-spinners";

const EditarProducto = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(false);

  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");

  const { id } = useParams();
  console.log(id);
  const [producto, setProducto] = useState({
    id: id,
    nombre: "",
    color: "",
    precio: "",
    stock: "",
    marca: {
      nombre: "",
    },
    modelo: {
      numeroSerie: "",
    },
    categoria: {
      id: 0,
      nombre: "",
      icono: "",
    },
  });

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const response = await fetch("http://3.89.202.193:8080/api/v1/categoria");
        if (response.ok) {
          const data = await response.json();
          setCategorias(data);
        } else {
          console.error("Error al obtener las categorías");
        }
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    }

    obtenerCategorias();
  }, [])

  useEffect(() => {
    const ModProducto = async () => {
      try {
        const response = await fetch(
          `http://3.89.202.193:8080/api/v1/instrumentos/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setProducto((prevProducto) => ({
            ...prevProducto,
            nombre: data.nombre,
            color: data.color,
            precio: data.precio,
            stock: data.stock,
            marca: {
              nombre: data.marca.nombre,
            },
            modelo: {
              numeroSerie: data.modelo.numeroSerie,
            },
            categoria: {
            ...prevProducto.categoria,
            id: data.categoria.id,
            nombre: data.categoria.nombre,
            icono: data.categoria.icono,
            },
            imagenes: data.imagenes
          }));
        } else {
          throw new Error("Error al obtener el producto");
        }

        // setProducto({
        //   data

        // id: data.id,
        // nombre: data.nombre,
        // color: data.color,
        // precio: data.precio,
        // stock: data.stock,
        // marca: data.marca.nombre,
        // modelo: data.modelo.numeroSerie,
        // categoria: data.categoria.nombre

        // });
      } catch (error) {
        console.error("Error al obtener la información del producto", error);
      }
    };

    ModProducto();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "categoria") {
      const categoriaId = parseInt(value); 
  
      const categoriaSeleccionada = categorias.find(cat => cat.id === categoriaId);
  
      if (categoriaSeleccionada) {
        setProducto((prevProducto) => ({
          ...prevProducto,
          categoria: {
            ...prevProducto.categoria,
            id: categoriaSeleccionada.id,
            nombre: categoriaSeleccionada.nombre,
            icono: categoriaSeleccionada.icono,
          },
        }));
        setCategoriaSeleccionada(categoriaId); 
      } else {
        console.error("Categoría no encontrada");
      }
    } else {
      
      const fieldToUpdate = name;
      const nestedFieldName = e.target.getAttribute("data-nested");
  
      setProducto((prevProducto) => ({
        ...prevProducto,
        [fieldToUpdate]: {
          ...prevProducto[fieldToUpdate],
          [nestedFieldName]: value,
        },
      }));
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);

      await fetch(`http://3.89.202.193:8080/api/v1/instrumentos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(producto),
      });
      setAlert(true);
    } catch (error) {
      console.error("Error al actualizar el producto", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form className="editar-producto-form" onSubmit={handleEditSubmit}>
        <h2 className="h2-edit">Editar Producto</h2>
        <label className="label-form">ID:</label>
        <input
          className="input-form"
          type="text"
          value={producto.id}
          disabled
        />

        <label className="label-form">NOMBRE:</label>
        <input
          className="input-form"
          type="text"
          value={producto.nombre}
          disabled
        />

        <label className="label-form">Color:</label>
        <input
          className="input-form"
          type="text"
          name="color"
          value={producto.color}
          onChange={handleChange}
        />

        <label className="label-form">Precio:</label>
        <input
          className="input-form"
          type="text"
          name="precio"
          value={producto.precio}
          onChange={handleChange}
        />

        <label className="label-form">Stock:</label>
        <input
          className="input-form"
          type="text"
          name="stock"
          value={producto.stock}
          onChange={handleChange}
        />

        <label className="label-form">Marca:</label>
        <input
          className="input-form"
          type="text"
          name="marca"
          data-nested="nombre"
          value={producto.marca.nombre}
          onChange={handleChange}
        />

        <label className="label-form">Modelo:</label>
        <input
          className="input-form"
          type="text"
          name="modelo"
          data-nested="numeroSerie"
          value={producto.modelo.numeroSerie}
          onChange={handleChange}
        />

        <label className="label-form">Categoria:</label>
        <select
          className="input-form"
          name="categoria"
          value={categoriaSeleccionada}
          onChange={handleChange}
        >
          <option value="">Seleccionar una categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
            ))}
        </select>

        <button className="button-edit" type="submit">
          {isLoading ? <ScaleLoader color="#ffffff" height={16} /> : "Editar producto"}
        </button>
        {alert && (
        <Alert severity="success">
          Instrumento modificado correctamente.
        </Alert>
      )}
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
