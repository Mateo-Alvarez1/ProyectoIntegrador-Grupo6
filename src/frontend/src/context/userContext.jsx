import { createContext, useState } from 'react'

export const userContext = createContext()
const Provider = userContext.Provider

const UserContextProvider = ({children}) => {

    // acá se inicializa el estado del usuario con el jwt 
    const [userJwt, setUserJwt] = useState(localStorage.getItem('token')) 
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user'))) 

    const [userAlert, setUserAlert] = useState(false);

    const login = async (user) => {
      
      if (!user) {
          return;
      }

      let token = user.token;
      if (!token) {
          return;
      }
  
      let payload = JSON.parse(atob(token.split(".")[1]));
  
      console.log('payload: ' + payload);
  
      localStorage.setItem('token', JSON.stringify(user.token));
      console.log('token guardado en localstorage: ' + localStorage.getItem('token'));
      
      setUserJwt(localStorage.getItem('token'));
      console.log('token seteado en función login: ' + userJwt);
  
      // Verifica que payload no sea nulo antes de acceder a sus propiedades
      if (payload) {
          localStorage.setItem('user', JSON.stringify(
              {
                  nombre: payload.nombre,
                  apellido: payload.apellido,
                  email: payload.sub,
                  rol: payload.role,
              }
          ));

      setUser(JSON.parse(localStorage.getItem('user'))); 
      }
  
      // el fetch de login se hace en el componente Login.jsx
  }

    const logout = () => {
        // acá se borra el jwt del localstorage
        setUserJwt(null)
        localStorage.removeItem('token')

        // y se setea el estado del usuario
        setUser(null)
        localStorage.removeItem('user')

    }

  return (
    <Provider value={{user, userJwt, login, logout, userAlert, setUserAlert}}>
        {children}
    </Provider>
  )
}

export default UserContextProvider;