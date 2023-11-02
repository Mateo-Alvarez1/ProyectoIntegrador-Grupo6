import { useState } from "react";
import Input from "../../Components/Input/Input";
import "./Login.css"
//import { useNavigate } from "react-router";
//import { setUserContext } from "../../context/userContext"; 

const Login = () => {
  // estados para los campos
  const [userEmail, setUserEmail] = useState({ value: '', valid: null });
  const [userPassword, setUserPassword] = useState({ value: '', valid: null });

  //const [error, setError] = useState('');
    
  // const navigate = useNavigate();

  // const setUser = (user) => {
  //   setUserContext(user);
  //};

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

  const login = async (email, password) => {
    
    //setUser({email, password})
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateInputs();
    

    if (userEmail && userPassword) {
      try {
        await login(userEmail, userPassword);
        //logueo exitoso
        //navigate("/");
    }
      catch (error) {
    // ha ocurrido un error al loguear al usuario
    // mostrar un mensaje de error al usuario
    // ...
  }
  }
}

  return (
    <div>
      <h1 className="titulo">Login</h1>
      <form className= "form" onSubmit={handleSubmit}>
      <Input className= "input"
              state={userEmail}
              setState={setUserEmail}
              label='Email'
              type='email'
              id='userEmail'
              name='userEmail'
              error='No se encuentra usuario registrado con este email.'
              placeholder='Ingrese su email'
              
            />
      <Input className= "input"
              state={userPassword}
              setState={setUserPassword}
              label='Contraseña'
              type='password'
              id='userPassword'
              name='userPassword'
              error='La contraseña no es correcta.'
              placeholder='Ingrese su contraseña'
              
            />
      <button className= "button" type="submit">Iniciar sesión</button>
      </form>
    </div>
  )
}

export default Login;