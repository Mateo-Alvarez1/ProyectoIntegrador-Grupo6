import Amplificador from '../../assets/AmplificadorStaggParaGuitarra-40watts-Distorsion.jpg'
import GuitarraClasica from '../../assets/GuitarraClasica.jpg'
import MicrofonoCondensed from '../../assets/MicrofonoArtesiaCondensed.jpg'
import PianoTeclado from '../../assets/PianoKurzweil-NotasPesadas.jpg'
import Platillos from '../../assets/PlatilloSabian-MediumCrash.jpg'
import SoportePuas from '../../assets/SoporteDePuas-ParaMicrofono.jpg'
import EstucheGuitarra from '../../assets/EstucheStaggParaGuitarraAcustica.jpg'
import PianoDigital from '../../assets/PianoDigitalKurzweil-88Notas-Bluetooth.jpg'
import './recomendaciones.css'
import productos from "../../utils/products.json" 
import Card from '../Card/Card'

export const Recomendaciones = () => {



return (
  <div id="recomendacionesContainer">
    <h1>Recomendaciones</h1>
    <p>¿Listos para hacer música?</p> 
    <div className="recomendacionesCardContainer">
    {productos.map((producto) => {
          return <Card producto={producto} key={producto.id} />
        })}
    </div>
  </div>
)
}

/*export const Recomendaciones2 = () => {
const recomendaciones2 = [ 
{
  id: Math.random() * 3 ,
  nombre : 'Platillos Sabian Medium Crash' ,
  imagen: Platillos,
  precio: 2399.99
},  
{
  id: Math.random() * 3 ,
  nombre : 'Soporte de Puas para Microfono' ,
  imagen: SoportePuas,
  precio: 899.99
},  
{
  id: Math.random() * 3 ,
  nombre : 'Estuche para Guitarra Acustica Stagg' ,
  imagen: EstucheGuitarra,
  precio: 499.99
},  
{
  id: Math.random() * 3 ,
  nombre : 'Piano Digital Kurzweil 88Notas Marron' ,
  imagen: PianoDigital,
  precio: 11999.99
},  
]

  
  return(  
    <div id="recomendacionesContainer2">
    <div className="recomendacionesCardContainer2">
      {recomendaciones2.map((recomendacion) => (
        <div className="recomendacionesCard" key={recomendacion.id}>
          <h3>{recomendacion.nombre}</h3>
          <p>Precio: ${recomendacion.precio}</p>
          <img src={recomendacion.imagen} alt={recomendacion.nombre} />
        </div>
        
      ))}
    </div>
  </div>
    
  )

}*/
