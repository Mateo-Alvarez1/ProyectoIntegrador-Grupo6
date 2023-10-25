import { useState } from "react";
import "./altaprod.css"

const ProductoForm = (onAddProducto) => {
    const [modelo, setModelo] = useState("");
    const [categoria, setCategoria] = useState("");
    const [marca, setMarca] = useState("");
    const [precio, setPrecio] = useState(0);
    
    const handleFormSubmit = (e) => {
        e.preventDefault();
        onAddProducto({modelo,categoria,marca,precio})
        
    
            };
        
            return (
                
            <form className= "form" onSubmit={handleFormSubmit}>
                <h2 className="titulo">Agregar Producto</h2>
                <input className="input" type="text" placeholder=" " value {...modelo} onChange={(e) => setModelo(e.target.value)}/>
                <input className="input" type="text" placeholder="Categoría" value {...categoria}onChange={(e) => setCategoria(e.target.value)}/>
                <input className="input" type="text" placeholder="Marca" value {...marca} onChange={(e) => setMarca(e.target.value)}/>
                <input className="input" type="number" placeholder="Precio" value {...precio} onChange={(e) => setPrecio(e.target.value)}/>
                <button className= "button" type="submit">Agregar producto</button>
            </form>
            );
        };
        
        export default ProductoForm;