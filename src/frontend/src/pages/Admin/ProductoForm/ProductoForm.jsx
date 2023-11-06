import { useState } from "react";
import "./productoform.css";
import { useDropzone } from "react-dropzone";

const ProductoForm = () => {
  const URL = "http://localhost:8080/api/v1/instrumentos";

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

    agregarProducto(producto);
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
          <button>Seleccionar Archivo</button>
          <p>
            {uploadedFiles.length === 0
              ? "Sin imágenes cargadas"
              : uploadedFiles.length === 1
              ? "1 imagen cargada"
              : `${uploadedFiles.length} imágenes cargadas`}
          </p>
        </div>
      </div>

      {uploadedFiles.length > 0 && (
        <div>
          <h3>Imágenes Cargadas:</h3>
          <div className="imageContainerForm">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="uploaded-image">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Uploaded ${index}`}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      <button className="button" type="submit">
        Agregar producto
      </button>
    </form>
  );
};

export default ProductoForm;
