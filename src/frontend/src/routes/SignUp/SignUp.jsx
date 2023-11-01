import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/userContext';
import Input from '../../Components/Input/Input';
import './SignUp.css'

const SignUp = () => {

    // estados para los campos del formulario
    const [userName, setUserName] = useState({ value: '', valid: null });
    const [userLastName, setUserLastName] = useState({ value: '', valid: null });
    const [userEmail, setUserEmail] = useState({ value: '', valid: null });
    const [userPassword, setUserPassword] = useState({ value: '', valid: null });
    const [userPasswordConfirmation, setUserPasswordConfirmation] = useState({ value: '', valid: null });

    // estado para el mensaje de error
    const [isFormValid, setIsFormValid] = useState(false);
    // const [error, setError] = useState('');

    // navegación y context (para el logeo del usuario creado)
    // const navigate = useNavigate();
    // const { login } = useUserContext;

    // regex para validar el formulario
    const regex = {
        nameAndLastName: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
        email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/ // mínimo 8 caracteres, al menos una letra y un número
    }

    // validar contraseña(s)
    const validatePasswords = () => {
      const isValid = userPassword.value.length > 0 && userPassword.value === userPasswordConfirmation.value; 
      setUserPasswordConfirmation((prevState) => {
        return { ...prevState, valid: isValid.toString() }; // 
      });
    }

    // validar que los inputs no estén vacíos
    const validateInputs = () => {
      const inputFields = [
        { value: userName.value, setValue: setUserName },
        { value: userLastName.value, setValue: setUserLastName },
        { value: userEmail.value, setValue: setUserEmail },
        { value: userPassword.value, setValue: setUserPassword },
        { value: userPasswordConfirmation.value, setValue: setUserPasswordConfirmation }
      ];
    
      inputFields.forEach(({ value, setValue }) => {
        if (value === '') {
          setValue(prevState => ({ ...prevState, valid: false }));
        }
      });
    };

    // validar que todos los campos del form sean válidos
    const validateForm = () => { 
      return (
        userName.valid === 'true' &&
        userLastName.valid === 'true' &&
        userEmail.valid === 'true' &&
        userPassword.valid === 'true' &&
        userPasswordConfirmation.valid === 'true'
      );
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      validateInputs();
      setIsFormValid(validateForm());

      if (isFormValid) {
        // lógica para crear la cuenta
        // fetch a la API 
      }
    }
    
  return (
    <div className='formContainer'>
        <h1>Crear Cuenta</h1>
        <form
          className='signUpForm'
          onSubmit={handleSubmit}
          onChange={validateForm}>

          <div>
            <Input
              state={userName}
              setState={setUserName}
              label='Nombre'
              type='text'
              id='userName'
              name='userName'
              error='Solo se permiten letras y espacios.'
              placeholder='Ingrese su nombre'
              regex={regex.nameAndLastName}
            />
            <Input
              state={userLastName}
              setState={setUserLastName}
              label='Apellido'
              type='text'
              id='userLastName'
              name='userLastName'
              error='Solo se permiten letras y espacios.'
              placeholder='Ingrese su apellido'
              regex={regex.nameAndLastName}
            />
          </div>

          <div>
            <Input
              state={userEmail}
              setState={setUserEmail}
              label='Email'
              type='email'
              id='userEmail'
              name='userEmail'
              error='Ingrese un email válido.'
              placeholder='Ingrese su email'
              regex={regex.email}
            />
            <Input
              state={userPassword}
              setState={setUserPassword}
              label='Contraseña'
              type='password'
              id='userPassword'
              name='userPassword'
              error='La contraseña debe tener al menos 8 caracteres, una letra y un número.'
              placeholder='Ingrese su contraseña'
              regex={regex.password}
            />
            <Input
              state={userPasswordConfirmation}
              setState={setUserPasswordConfirmation}
              label='Confirmar contraseña'
              type='password'
              id='userPasswordConfirmation'
              name='userPasswordConfirmation'
              error='Las contraseñas no coinciden, intentelo de nuevo.'
              placeholder='Confirme su contraseña'
              executeFunction={validatePasswords}
            />
          </div>
          {/* {isFormValid === false && (
            <p className='errorMsgForm'>
              {error
                  ? error
                  : 'Los datos son incorrectos. Verificalos y volvé a intentar'}
            </p>
          )} */}
          <button type='submit' className='submitButton'>
            Crear Cuenta
          </button>
          <div className='loginAccess'>
            <p>¿Ya tienes una cuenta? 
            <Link className='loginLink' to='/login'>
              Inicia sesión
            </Link>
            </p>
          </div>
        </form>
    </div>
  )
}

export default SignUp