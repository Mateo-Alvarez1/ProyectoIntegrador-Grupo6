import { useState } from "react"
import { AiOutlineSearch } from "react-icons/ai";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './buscador.css'
import producto from '../../utils/products.json'
import { useEffect } from "react";

export const Buscador = ({ onSearch, onSearchQuery }) => {

    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState([])

    // const url; 
    // const showData = async () => {
    //     const response = await fetch(url)
    //     const data = await response.json()
    //     console.log(data)
    // }

    // useEffect(() => {
    //     showData()
    // }, [])

    const searcher = (e) => { 
        const query = e.target.value;
        setSearch(query)
        onSearchQuery(query)
    }

    useEffect(() => {
        if (!search) {
            setSearchResults([]);
        } else {
            const filteredResults = producto.filter(instrumento => {
                return instrumento.nombre.toLowerCase().includes(search.toLowerCase()) 
                || instrumento.marca.toLowerCase().includes(search.toLowerCase());
            });
            setSearchResults(filteredResults);
        }
    }, [search]);


    useEffect(() => {
        onSearch(searchResults);
    }, [searchResults, onSearch]);

    
    // const [formState, setFormState] = useState('')
    const [startDate, setStartDate] = useState(new Date());

    // const onInputChange = ({ target }) => {
    //     const { name , value } = target
    //     setFormState({
    //         ...formState ,
    //         [name]:value
    //     })
    // }

    const onHandleSubmit = ( e ) => {
        e.preventDefault();
        onSearch(searchResults);
    }


    return (
        <form  onSubmit={ onHandleSubmit } >
            <div className="searchContainer">
                <input 
                    type="text"
                    placeholder="¿Que instrumento buscas?"
                    name="instrumento"
                    value={search}
                    onChange={searcher}
                />
                <button type="submit"><AiOutlineSearch/></button>
                <DatePicker className="datePicker" minDate={new Date()} selected={startDate} onChange={(date) => setStartDate(date)}  />
            </div>
        </form>
    )
}