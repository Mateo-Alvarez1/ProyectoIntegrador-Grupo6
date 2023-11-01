import React from 'react'
import './Input.css'

const Input = ({state, setState, label, type, id, name, error, placeholder, regex, executeFunction}) => {

    const onChange = (e) => {
        setState({ ...state, value: e.target.value });
    }

    const validation = () => {
        if (regex) {
          if (regex.test(state.value)) { // regex.test() devuelve true o false
            setState({ ...state, valid: 'true' });
          } else {
            setState({ ...state, valid: 'false' });
          }
        }
    
        if (executeFunction) {
          executeFunction(); // ejecuta la función que recibe por props
        }
    };

  return (
    <div className='inputContainer'>
        <label className='inputLabel' htmlFor={name}>
            {label}
        </label>
        <input 
            className={`input ${state.valid === 'false' ? 'inputError' : ''}`} 
            type={type}
            id={id}
            name={name}
            value={state.value}
            onChange={onChange}
            placeholder={placeholder}
            onBlur={validation}
        />
        {state.valid === 'false' && (
            <span className='errorMsg'>{error}</span>
        )}
    </div>
  )
}

export default Input