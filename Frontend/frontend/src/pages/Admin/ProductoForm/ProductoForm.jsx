import { useState, useEffect } from "react";
import "./productoform.css";
import { useDropzone } from "react-dropzone";
import { Alert } from "@mui/material";
import { ScaleLoader } from "react-spinners";

const ProductoForm = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState(false);

  const [categoria, setCategoria] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");

  const [modelo, setModelo] = useState("");
  const [marca, setMarca] = useState("");
  const [color, setColor] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const[imagenes, setImagenes]= useState([])
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
  } = useDropzone({
    accept: "image/*", // Acepta solo imágenes
    onDrop: (acceptedFiles) => {
      // Maneja los archivos subidos (limitado a 5 archivos)
      const filesToUpload = acceptedFiles.slice(0, 5);
      setUploadedFiles(filesToUpload);
    },
  });

  const URL = "http://3.89.202.193:8080/api/v1/instrumentos";
  const URlIMG = "http://3.89.202.193:8080/file/upload";

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const response = await fetch("http://3.89.202.193:8080/api/v1/categoria");
        if (response.ok) {
          const data = await response.json();
          setCategoria(data);
        } else {
          console.error("Error al obtener las categorías");
        }
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    }

    obtenerCategorias();
  }, [])


  const agregarProducto = (producto) => {
    setIsLoading(true);
    // Devolvemos la promesa de fetch
    return fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(producto),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setIsLoading(false);
        setAlert(true)

        setTimeout(() => {
        setAlert(false);
        }, 3000);
        return data; // Devolvemos data para que esté disponible después del await
      })
      .catch((error) => {
        console.error("Error al enviar la solicitud:", error);
        throw error; // Lanzamos el error para que esté disponible después del await
      });
  };
  


  const enviarImagenes = async () => {
    const nuevasImagenes = [];
  
    for (let i = 0; i < uploadedFiles.length; i++) {
      const file = uploadedFiles[i];
      const extension = file.name.slice(file.name.lastIndexOf(".") + 1);
      const nuevoNombre = `${categoriaSeleccionada}-${marca}-${modelo}-${color}-${i + 1}.${extension}`;
  
      nuevasImagenes.push(nuevoNombre);
  
      const archivoRenombrado = new File([file], nuevoNombre, { type: file.type });
      console.log("Nuevo nombre de imagen:", nuevoNombre);
  
      const formData = new FormData();
      formData.append("file", archivoRenombrado);
  
      try {
        const response = await fetch(URlIMG, {
          method: "POST",
          body: formData,
        });
  
        if (response.ok) {
          console.log(`Imagen ${i + 1} creada correctamente`);
        } else {
          console.error(`Error al crear la imagen ${i + 1}`);
        }
      } catch (error) {
        console.error(`Error al enviar la imagen ${i + 1}:`, error);
      }
    }
  
    // Después de manejar todas las imágenes, actualiza el estado una vez
    setImagenes([...imagenes,nuevasImagenes]);
    console.log("Imágenes actualizadas:", nuevasImagenes);
  };


  const enviarImagenesYAgregarProducto = async () => {
    const nuevasImagenes = [];
  
    for (let i = 0; i < uploadedFiles.length; i++) {
      const file = uploadedFiles[i];
      const extension = file.name.slice(file.name.lastIndexOf(".") + 1);
      const nuevoNombre = `${categoriaSeleccionada}-${marca}-${modelo}-${color}-${i + 1}.${extension}`;
  
      nuevasImagenes.push(nuevoNombre);
  
      const archivoRenombrado = new File([file], nuevoNombre, { type: file.type });
      console.log("Nuevo nombre de imagen:", nuevoNombre);
  
      const formData = new FormData();
      formData.append("file", archivoRenombrado);

      setIsLoading(true);
  
      try {
        const response = await fetch(URlIMG, {
          method: "POST",
          body: formData,
        });

  
        if (response.ok) {
          console.log(`Imagen ${i + 1} creada correctamente`);
        } else {
          console.error(`Error al crear la imagen ${i + 1}`);
        }
      } catch (error) {
        console.error(`Error al enviar la imagen ${i + 1}:`, error);
      }
    }
  
    // Después de manejar todas las imágenes, actualiza el estado una vez
    setImagenes(nuevasImagenes);
    console.log("Imágenes actualizadas:", nuevasImagenes);
  
    // Llamamos a agregarProducto después de manejar las imágenes
    const producto = {
      nombre: `${categoria} ${marca} ${modelo} ${color}`,
      marca: { nombre: marca },
      modelo: { numeroSerie: modelo },
      categoria: { nombre: categoriaSeleccionada },
      imagenes: nuevasImagenes, // Utilizamos las imágenes actualizadas
      color,
      precio: parseFloat(precio),
      stock: parseInt(stock),
    };
  
    // Llamamos a agregarProducto dentro de enviarImagenes
    await agregarProducto(producto);
  };
  



  const limpiarform = () =>  {
    setMarca("")
    setModelo("")
    setColor("")
    setPrecio("")
    setStock("")
    setImagenes([]);
  }

  
  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    // Espera a que se completen las imágenes y la llamada a agregarProducto
    await enviarImagenesYAgregarProducto();
  
    // Limpia el formulario
    limpiarform();
  };
  


  return (
    <form className="form" onSubmit={handleFormSubmit}>
      <h2 className="titulo">Agregar Producto</h2>
      <input
        className="input"
        type="text"
        placeholder="Marca"
        value={marca}
        onChange={(e) => setMarca(e.target.value)}
      />
      <input
        className="input"
        type="text"
        placeholder="Modelo"
        value={modelo}
        onChange={(e) => setModelo(e.target.value)}
      />
      <select
        className="input select"
        value={categoriaSeleccionada}
        onChange={(e) => setCategoriaSeleccionada(e.target.value)}
      >
        <option>Seleccione una categoría</option>
        {categoria.map((categoria) => (
          <option key={categoria.id} value={categoria.nombre}>
            {categoria.nombre}
          </option>
        ))}
      </select>
      <input
        className="input"
        type="text"
        placeholder="Color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
      />
      <input
        className="input"
        type="text"
        placeholder="Precio"
        value={precio}
        onChange={(e) => setPrecio(e.target.value)}
      />
      <input
        className="input"
        type="text"
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(e.target.value)}
      />

      <div {...getRootProps()} className="dropzone fileContainer">
        <input type="file" {...getInputProps()} className="fileInput" />
        <div></div>
        <div className="buttonContainer">
          <button type="button">Seleccionar Archivo</button>
          <p>
            {uploadedFiles.length === 0
              ? "Sin imágenes cargadas"
              : uploadedFiles.length === 1
              ? "1 imagen cargada"
              : `${uploadedFiles.length} imágenes cargadas`}
          </p>
        </div>
      </div>

  
      <button className="button" type="submit">
        {isLoading ? <ScaleLoader color="#ffffff" height={16} /> : "Agregar producto"}
      </button>
      {alert && (
        <Alert severity="success">
          Instrumento agregado correctamente.
        </Alert>
      )}
    </form>
  );
};

export default ProductoForm;
