import { createContext, useState } from 'react'

export const userContext = createContext(undefined)
const Provider = userContext.Provider

const UserContextProvider = ({children}) => {

    // acá se inicializa el estado del usuario con el jwt 
    const [userJwt, setUserJwt] = useState(null) // en el null va el jwt traido del localstorage
    const [user, setUser] = useState(null) // en el null va el usuario traido del localstorage (parseado)
    

    const login = (user) => {
        // acá se guarda el jwt en el localstorage
        // y se setea el estado del usuario
        // el fetch de login se hace en el componente Login.jsx
    }

    const logout = () => {
        // acá se borra el jwt del localstorage
        // y se setea el estado del usuario
    }

  return (
    <Provider value={{user, userJwt, login, logout}}>
        {children}
    </Provider>
  )
}

export default UserContextProvider;