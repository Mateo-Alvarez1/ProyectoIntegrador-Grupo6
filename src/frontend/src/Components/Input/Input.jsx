import { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import styles from './Input.module.css'

const Input = ({state, setState, label, type, id, name, error, placeholder, regex, executeFunction}) => {

    const onChange = (e) => {
        setState({ ...state, value: e.target.value });
    }

    const [viewPassword, setViewPassword] = useState(false)
    const [changeType, setChangeType] = useState(type)

    const handleViewPassword = () => {
      !viewPassword ? setViewPassword(true) : setViewPassword(false);
      changeType !== 'password' ? setChangeType('text') : setChangeType('password');
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
    <div className={styles.inputContainer}>
        <label className={styles.inputLabel} htmlFor={name}>
            {label}
        </label>
        <div className={styles.secondInputContainer}>
          <input 
              className={`${styles.input} ${state.valid === 'false' ? styles.inputError : ''}`} 
              type={type !== 'password' ? type : viewPassword ? 'text' : 'password'} // si el type es password, entonces si viewPassword es true, entonces el type es text, sino es password
              id={id}
              name={name}
              value={state.value}
              onChange={onChange}
              placeholder={placeholder}
              onBlur={validation}
          />
          {
            type === 'password' && (
              <span className={styles.iconPassword} data-activo="false">
                {viewPassword ? ( 
                  <AiFillEye 
                    onClick={handleViewPassword}/>
                ) : (
                  <AiFillEyeInvisible 
                    onClick={handleViewPassword}/>
                )}
              </span>
            )
          }
        </div>
        {state.valid === 'false' && (
            <span className={styles.errorMessage}>{error}</span>
        )}
    </div>
  )
}

export default Input