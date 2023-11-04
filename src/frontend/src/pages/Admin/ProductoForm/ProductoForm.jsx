import { useState } from "react";
import "./productoform.css";
import { useDropzone } from 'react-dropzone';


const ProductoForm = (onAddProducto) => {

    const [uploadedFiles, setUploadedFiles] = useState([]);

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        accept: 'image/*', // Acepta solo imágenes
        onDrop: (acceptedFiles) => {
          // Maneja los archivos subidos (limitado a 5 archivos)
          const filesToUpload = acceptedFiles.slice(0, 5);
          setUploadedFiles(filesToUpload);
        },
      });


    const [modelo, setModelo] = useState("");
    const [categoria, setCategoria] = useState("");
    const [marca, setMarca] = useState("");
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState(0);

    
    const handleFormSubmit = (e) => {
        e.preventDefault();
        onAddProducto({nombre,modelo,categoria,marca,precio})
        
    
            };
        
            return (
                
            <form className= "form" onSubmit={handleFormSubmit}>
                <h2 className="titulo">Agregar Producto</h2>
                <input className="input" type="text" placeholder="Nombre" value={nombre}  onChange={(e) => setNombre(e.target.value)}/>
                <input className="input" type="text" placeholder="Modelo" value= {modelo} onChange={(e) => setModelo(e.target.value)}/>
                <input className="input" type="text" placeholder="Categoría" value={categoria} onChange={(e) => setCategoria(e.target.value)}/>
                <input className="input" type="text" placeholder="Marca" value={marca} onChange={(e) => setMarca(e.target.value)}/>
                <input className="input" type="number" placeholder="Precio" value={precio} onChange={(e) => setPrecio(e.target.value)}/>
                <div {...getRootProps()} className="dropzone fileContainer">
                     <input type="file" {...getInputProps()} className="fileInput" />
                     <div>
                      
                     </div>
                     <div className="buttonContainer">
                     <button>Selecionar Archivo</button>
                     <p>
                        {uploadedFiles.length === 0
                            ? "Sin imagenes cargadas"
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
      <div key={index} className="uploaded-image" >
        <img src={URL.createObjectURL(file)} alt={`Uploaded ${index}`}  />
      </div>
    ))}
    </div>
  </div>
)}
                <button className= "button" type="submit">Agregar producto</button>



 
            </form>
            );
        };
        
        export default ProductoForm;