import Guitarra from "../../assets/GuitarraDanelectroSingle-Negra.jpg"
import Piano from '../../assets/PianoDigitalKurzweil-88Notas-Bluetooth.jpg'
import Bajo from '../../assets/BajoDanelectro-Withe.jpg'
import Bateria from '../../assets/BateriaSonor-Vintage-Black.jpg'
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
     {
          categorias.map( categoria => (
            <div className="categoriasCard">
              <img src={ categoria.imagen } alt={ categoria.nombre } />
              <h4>{ categoria.nombre }</h4>
            </div>
        ))
        }
     </div>
    </div>
  )
}
