import { useContext, useEffect, useState } from "react";
import Input from "../../Components/Input/Input";
import "./Login.css"
import { useNavigate } from "react-router";
import { userContext } from "../../context/userContext";
import { Link } from "react-router-dom";
import { ScaleLoader } from 'react-spinners';
import { Alert } from "@mui/material";


const Login = () => {
  // estados para los campos
  const [userEmail, setUserEmail] = useState({ value: '', valid: null });
  const [userPassword, setUserPassword] = useState({ value: '', valid: null });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(null);
  const [error, setError] = useState('');

  const [showReservationAlert, setShowReservationAlert] = useState(false);
    
  const navigate = useNavigate();
  const { login, setUserAlert } = useContext(userContext);

  const regex = {
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, // mínimo 8 caracteres, al menos una letra y un número
  };

  // const setUser = (user) => {
  //   setUserContext(user);
  //};

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search); 
    const reservationAlert = searchParams.get('reservationAlert');
    setShowReservationAlert(reservationAlert === 'true')
  }, [location.search]);

  //validar que campos no esten vacios
  const validateInputs = () => {
    const inputFields = [      
      { value: userEmail.value, setValue: setUserEmail },
      { value: userPassword.value, setValue: setUserPassword }      
    ];
  
    inputFields.forEach(({ value, setValue }) => {
      if (value === '') {
        setValue(prevState => ({ ...prevState, valid: false }));
      }
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    validateInputs();
    setIsFormValid(true);
    

    if (userEmail.valid === 'true' && userPassword.valid === 'true') {
      const data = {
        email: userEmail.value,
        password: userPassword.value,
      }
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/api/v1/auth/autenticar`, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          },
        })

        if (response.ok) {
          const user = await response.json();  
          if (typeof user == 'object') {
            login({...user});
            setUserAlert(true);
            navigate('/');
          }               
        }
    }
      catch (error) {
        setIsFormValid(false);
        setError(
          'No se ha podido iniciar sesión. Por favor, vuelva a intentarlo.'
        );
    } finally {
      setIsLoading(false);
    }
  }
}

  return (
    <div className="formContainer">
      {showReservationAlert && (
        <Alert severity="error">
          Para realizar una reserva, primero debes iniciar sesión.
        </Alert>
      )}
      <h1 className="signUpTitle">Inicia Sesión</h1>
      <form className= "signUpForm" onSubmit={handleSubmit}>
      <Input
              state={userEmail}
              setState={setUserEmail}
              label='Email'
              type='email'
              id='userEmail'
              name='userEmail'
              error='El formato del email no es válido.'
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
              error='La contraseña no es correcta.'
              placeholder='Ingrese su contraseña'
              regex={regex.password}
            />
        {isFormValid === false && (
          <p className="errorMsgForm">
            {error ? error : "Los datos son inválidos, por favor vuelva a intentarlo."}
          </p>
        )}
      <button className="submitButton" type="submit">
        {isLoading ? <ScaleLoader color='#ffffff' height={16}/> : 'Iniciar Sesión'}
      </button>
      <div className="loginAccess">
          <p>¿No tienes una cuenta?</p>
          <p>
            <Link className="loginLink" to="/signup">
              Registrate
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Login;