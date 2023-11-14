import { useState } from "react";
import "./productoform.css";
import { useDropzone } from "react-dropzone";
import Producto from "../../../routes/Producto/Producto";

const ProductoForm = () => {
  const URL = "http://localhost:8080/api/v1/instrumentos";

  const URlIMG = "http://localhost:8080/file/upload";




  const agregarProducto = (producto) => {
    fetch(URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(producto),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("Error al enviar la solicitud:", error));
  };


  const enviarImagenes = async () => {
    for (let i = 0; i < uploadedFiles.length; i++) {
      const file = uploadedFiles[i];
  
      // Renombrar el archivo antes de enviarlo
      const nuevoNombre = `${marca}-${modelo}-${color}-${i+1}`;
      const archivoRenombrado = new File([file], nuevoNombre, { type: file.type });
  
      const formData = new FormData();
      formData.append("file", archivoRenombrado);
  
      try {
        const response = await fetch(URlIMG, {
          method: "POST",
          body: formData,
        });
  
        const data = await response.text();
        console.log(data);
  
        if (response.ok) {
          console.log(`Imagen ${i + 1} creada correctamente`);
        } else {
          console.error(`Error al crear la imagen ${i + 1}:`, data.message);
        }
      } catch (error) {
        console.error(`Error al enviar la imagen ${i + 1}:`, error);
        // Puedes manejar el error de la manera que prefieras (por ejemplo, mostrando un mensaje al usuario)
      }
    }
  };
  





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

  const [modelo, setModelo] = useState("");
  const [categoria, setCategoria] = useState("");
  const [marca, setMarca] = useState("");
  const [color, setColor] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const producto = {
      nombre: `${marca} ${modelo} ${color}`,
      marca:{
        nombre:marca
      },
      modelo:{
        numeroSerie:modelo
      },
      categoria:{
        nombre:categoria
      },
      color,
      precio: parseFloat(precio),
      stock: parseInt(stock),
    };

      console.log(uploadedFiles);

      // HAY QUE CAMBIAR DESPUES PORQUE CREA LAS IMAGENES INDEPENDIENTEMENTE DE SI EL OBJETO SE GUARDA O NO
      enviarImagenes();



    agregarProducto(producto);
    //limpiarform();
  };

  const limpiarform = () =>  {
    setMarca("")
    setModelo("")
    setColor("")
    setPrecio("")
    setStock("")
    setCategoria("")
  }

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
      <input
        className="input"
        type="text"
        placeholder="Categoría"
        value={categoria}
        onChange={(e) => setCategoria(e.target.value)}
      />
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
        Agregar producto
      </button>
    </form>
  );
};

export default ProductoForm;
