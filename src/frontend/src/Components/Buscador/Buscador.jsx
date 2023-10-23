import { useState } from "react"
import './buscador.css'

export const Buscador = () => {

    useState


    return (
        <div className="searchContainer">
            <input 
                type="text"
                placeholder="¿Que instrumento buscas?"
             />
             <button>Buscar</button>
        </div>
    )
}