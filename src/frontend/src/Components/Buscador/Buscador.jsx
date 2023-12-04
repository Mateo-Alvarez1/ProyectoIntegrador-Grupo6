import { useState } from "react"
import { AiOutlineSearch } from "react-icons/ai";
import './buscador.css'
// import producto from '../../utils/products.json'
import { useEffect } from "react";
import Autosuggest from "react-autosuggest/dist/Autosuggest";
import BuscadorFechas from "../BuscadorFechas/BuscadorFechas";

export const Buscador = ({ onSearch, onSearchQuery, scrollToResults }) => {

    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [suggestions, setSuggestions] = useState([])

    const [producto, setProducto] = useState() 

    const url = 'http://localhost:8080/api/v1/instrumentos'
    const showData = async () => {
        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setProducto(data);
            } else {
                console.error('Error al obtener los datos de la API');
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        showData()
    }, [])

    
    const getSuggestions = (value) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

    return inputLength === 0 ? [] : producto.filter(instrumento => 
        instrumento.nombre.toLowerCase().includes(inputValue) || 
        instrumento.marca.nombre.toLowerCase().includes(inputValue) || 
        instrumento.categoria.nombre.toLowerCase().includes(inputValue)
    ).slice(0, 4);
    }

    const onSuggestionFetchRequested = ({ value }) => {
        setSuggestions(getSuggestions(value));
    }

    const onSuggestionClearRequested = () => {
        setSuggestions([]);
    }

    const getSuggestionValue = (suggestion) => {
        return suggestion.nombre;
    }

    const renderSuggestion = (suggestion) => {
        return (
            <div>
                {suggestion.nombre}
            </div>
        )
    }

    const handleChange = (event, { newValue }) => {
        setSearch(newValue)
        onSearchQuery(newValue)
    }

    const onHandleSubmit = ( e ) => {
        e.preventDefault();
        onSearch(searchResults);
        scrollToResults();
    }

    useEffect(() => {
        if (!search) {
            setSearchResults([]);
        } else {
            const filteredResults = producto.filter(instrumento => { 
                return (
                    instrumento.nombre.toLowerCase().includes(search.toLowerCase()) || 
                    instrumento.marca.nombre.toLowerCase().includes(search.toLowerCase()) || 
                    instrumento.categoria.nombre.toLowerCase().includes(search.toLowerCase())
                );
            });
            setSearchResults(filteredResults.slice(0, 4));
        }
    }, [search]);

    useEffect(() => {
        onSearch(searchResults);
    }, [searchResults, onSearch]);

    const inputProps = { 
        placeholder: '¿Qué instrumento buscas?',
        value: search,
        onChange: handleChange
    };


    return (
        <form  onSubmit={ onHandleSubmit } >
            <div className="searchContainer">
                <Autosuggest
                    className="react-autosuggest__container"
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={onSuggestionFetchRequested}
                    onSuggestionsClearRequested={onSuggestionClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
                />
                <button type="submit"><AiOutlineSearch/></button>
                {/* <BuscadorFechas onReservasSearch={onReservasSearch}/> */}
            </div>
        </form>
    )
}