import { Alert } from "@mui/material";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { ScaleLoader } from "react-spinners";

const CrearCategoria = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [alert, setAlert] = useState(false);

    const [nombre, setNombre] = useState("");
    const [icono, setIcono] = useState("");
    const [uploadedFile, setUploadedFile] = useState("");

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles && acceptedFiles.length > 0) {
            const fileToUpload = acceptedFiles[0]; // Tomar solo el primer archivo
            setUploadedFile(fileToUpload);
        }
    };

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        onDrop,
        maxFiles: 1, 
    });

    const url = "http://3.89.202.193:8080/api/v1/categoria";
    const url_img = "http://3.89.202.193:8080/file/upload";

    const enviarImagenYCrearCategoria = async () => {
        if (!uploadedFile || !nombre) return; // Verificar si hay una imagen y nombre

        setIsLoading(true);

        const formData = new FormData();
        formData.append('file', uploadedFile);

        try {
            const response = await fetch(url_img, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                console.log('Imagen cargada correctamente');

                const categoria = {
                    nombre: nombre,
                    icono: uploadedFile.name,
                };

                const categoriaResponse = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(categoria),
                });

                if (categoriaResponse.ok) {
                    console.log('Categoría creada correctamente');
                    setIsLoading(false);
                    setAlert(true);

                    setTimeout(() => {
                        setAlert(false);
                    }, 3000);
                } else {
                    console.error('Error al crear la categoría');
                }
            } else {
                console.error('Error al cargar la imagen');
            }
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    };

    return (
        <div className="form">
            <h2 className="titulo">Crear categoría</h2>
            <div className="label-input-container">
                <label className="label-input">Nombre:</label>
                <input
                    className="input"
                    type="text"
                    placeholder="Nombre de la categoría"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
            </div>
            <small className="small-text">*El nombre de la categoría tiene que estar en singular.</small>
            <small className="small-text">Ejemplo: Guitarra</small>
            <div {...getRootProps()} className="dropzone fileContainer">
                <label className="label-input">Icono:</label>
                <input type="file" {...getInputProps()} className="fileInput"/>
                    <div className="buttonContainer">
                        <button type="button">Seleccionar Archivo</button>
                        {!uploadedFile ? (
                            <p>Sin imagenes cargadas</p>
                        ) : (
                            <p>Imagen seleccionada: {uploadedFile.name}</p>
                        )}
                    </div>
            </div>
            <button onClick={enviarImagenYCrearCategoria} className="button">
                {isLoading ? <ScaleLoader color="#ffffff" height={16} /> : "Crear categoría"}
            </button>
            {alert && <Alert severity="success">Categoría creada correctamente</Alert>}
        </div>
    );
};

export default CrearCategoria;
