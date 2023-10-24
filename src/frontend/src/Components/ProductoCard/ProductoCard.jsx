
const ProductoCard = ({producto}) => {
  return (
    <div className="recomendacionesCard" key={producto.id}>
        <h3>{producto.nombre}</h3>
        <p>Precio: USD {producto.precio}</p>
        <img src={producto.imagen} alt={producto.nombre} />
    </div>
  )
}


export default ProductoCard