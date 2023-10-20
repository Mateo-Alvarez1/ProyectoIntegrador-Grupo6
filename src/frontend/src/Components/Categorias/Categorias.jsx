import Guitarra from '../../assets/guitar.png'
import Bajo from '../../assets/bass-guitar.png'
import Piano from '../../assets/keyboard.png'
import Bateria from '../../assets/drum-set.png'
import './categorias.css'

export const Categorias = () => {

    const categorias = [
        {
            id: Math.random() * 3 ,
            nombre : 'Guitarras' ,
            imagen: Guitarra
        },
        {
          id: Math.random() * 3 ,
          nombre : 'Bajos' ,
          imagen: Bajo
      },
      {
        id: Math.random() * 3 ,
        nombre : 'Baterias' ,
        imagen: Bateria
    },
    {
      id: Math.random() * 3 ,
      nombre : 'Pianos' ,
      imagen: Piano
  },
    ]


  return (
    <div id="categoriasContainer">
      <h1>Categorias</h1>
      <div className="categoriasCardContainer">
        {categorias.map((categoria) => (
          <div className="categoriasCard" key={categoria.id}>
            <h4>{categoria.nombre}</h4>
            <img src={categoria.imagen} alt={categoria.nombre} />
          </div>
        ))}
      </div>
    </div>
  );

}
