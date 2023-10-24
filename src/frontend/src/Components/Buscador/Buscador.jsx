import { useState } from "react"
import { AiOutlineSearch } from "react-icons/ai";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './buscador.css'

export const Buscador = () => {

    
    const [formState, setFormState] = useState('')
    const [startDate, setStartDate] = useState(new Date());

    const onInputChange = ({ target }) => {
        const { name , value } = target
        setFormState({
            ...formState ,
            [name]:value
        })
    }

    const onHandleSubmit = ( e ) => {
        e.preventDefault();
    }


    return (
        <form  onSubmit={ onHandleSubmit } >
            <div className="searchContainer">
                <input 
                    type="text"
                    placeholder="¿Que instrumento buscas?"
                    name="instrumento"
                    onChange={ onInputChange }
                />
                <button type="submit"><AiOutlineSearch/></button>
                <DatePicker className="datePicker" minDate={new Date()} selected={startDate} onChange={(date) => setStartDate(date)}  />
            </div>
        </form>
    )
}