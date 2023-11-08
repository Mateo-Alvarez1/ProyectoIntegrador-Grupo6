import { createContext, useState } from 'react'

export const userContext = createContext(undefined)
const Provider = userContext.Provider

const UserContextProvider = ({children}) => {

    // acá se inicializa el estado del usuario con el jwt 
    const [userJwt, setUserJwt] = useState(localStorage.getItem('token')) // en el null va el jwt traido del localstorage
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user'))) // en el null va el usuario traido del localstorage (parseado)

     console.log(user);
    console.log(userJwt);

    const login = (user) => {
        // acá se setea y se guarda el jwt en el localstorage
        setUserJwt(user.token)
        console.log(user.token);
        let token = user.token
        let payload = JSON.parse(atob(token.split(".")[1]))
        console.log(payload);

        localStorage.setItem('token', JSON.stringify(user.token))

        // y se setea el estado del usuario
        setUser(user)
        localStorage.setItem('user', JSON.stringify(
        {
          nombre: payload.nombre,
          apellido: payload.apellido,
          email: payload.sub,
          rol: payload.role,
        }
        ))
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
    <Provider value={{user, userJwt, login, logout}}>
        {children}
    </Provider>
  )
}

export default UserContextProvider;