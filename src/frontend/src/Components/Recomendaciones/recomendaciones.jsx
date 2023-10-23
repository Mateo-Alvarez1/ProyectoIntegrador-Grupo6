import Amplificador from '../../assets/AmplificadorStaggParaGuitarra-40watts-Distorsion.jpg'
import GuitarraClasica from '../../assets/GuitarraClasica.jpg'
import MicrofonoCondensed from '../../assets/MicrofonoArtesiaCondensed.jpg'
import PianoTeclado from '../../assets/PianoKurzweil-NotasPesadas.jpg'
import Platillos from '../../assets/PlatilloSabian-MediumCrash.jpg'
import SoportePuas from '../../assets/SoporteDePuas-ParaMicrofono.jpg'
import EstucheGuitarra from '../../assets/EstucheStaggParaGuitarraAcustica.jpg'
import PianoDigital from '../../assets/PianoDigitalKurzweil-88Notas-Bluetooth.jpg'
import './recomendaciones.css'

export const Recomendaciones = () => {

  const recomendaciones = [
    {
        id: Math.random() * 3 ,
        nombre : 'Amplificador Stagg para Guitarra 40watts Distorsion' ,
        imagen: Amplificador,
        precio: 2699.99
    },
    {
      id: Math.random() * 3 ,
      nombre : 'Guitarra Clasica Yamaha 10' ,
      imagen: GuitarraClasica,
      precio: 7499.99
  },
  {
    id: Math.random() * 3 ,
    nombre : 'Microfono Condensed Artesia' ,
    imagen: MicrofonoCondensed,
    precio: 1549.99
},
{
  id: Math.random() * 3 ,
  nombre : 'Teclado Kurzweil' ,
  imagen: PianoTeclado,
  precio: 5999.99
},  
]

return (
  <div id="recomendacionesContainer">
    <h1>Recomendaciones</h1>
    <p>¿Listos para hacer música?</p> 
    <br />
    <div className="recomendacionesCardContainer">
      {recomendaciones.map((recomendacion) => (
        <div className="recomendacionesCard" key={recomendacion.id}>
          <h3>{recomendacion.nombre}</h3>
          <p>Precio: ${recomendacion.precio}</p>
          <img src={recomendacion.imagen} alt={recomendacion.nombre} />
        </div>
        
      ))}
    </div>
  </div>
)
}

export const Recomendaciones2 = () => {
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

}
