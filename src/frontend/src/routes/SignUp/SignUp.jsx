import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/userContext';

const SignUp = () => {

    // estados para los campos del formulario
    const [userName, setUserName] = useState({ value: '', valid: null });
    const [userLastName, setUserLastName] = useState({ value: '', valid: null });
    const [userEmail, setUserEmail] = useState({ value: '', valid: null });
    const [userPassword, setUserPassword] = useState({ value: '', valid: null });
    const [userPasswordConfirmation, setUserPasswordConfirmation] = useState({ value: '', valid: null });

    // estado para el mensaje de error
    const [isFormValid, setIsFormValid] = useState(null);
    const [error, setError] = useState('');

    // navegación y context (para el logeo del usuario creado)
    const navigate = useNavigate();
    const { login } = useUserContext;

    // regex para validar el formulario
    const regex = {
        nameAndLastName: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ // mínimo 8 caracteres, al menos una letra y un número
    }

    // funciones para validar el formulario


  return (
    <div className='formContainer'>
        <h1>Crear Cuenta</h1>
        <form>
            <input/>
        </form>
    </div>
  )
}

export default SignUp