import { createContext, useState } from 'react'

export const userContext = createContext(undefined)
const Provider = userContext.Provider

const UserContextProvider = ({children}) => {

    // acá se inicializa el estado del usuario con el jwt 
    const [userJwt, setUserJwt] = useState(localStorage.getItem('jwt')) // en el null va el jwt traido del localstorage
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user'))) // en el null va el usuario traido del localstorage (parseado)
    

    const login = (user) => {
        // acá se setea y se guarda el jwt en el localstorage
        setUserJwt(user.jwt)
        localStorage.setItem('jwt', JSON.stringify(user.jwt))

        // y se setea el estado del usuario
        setUser(user)
        localStorage.setItem('user', JSON.stringify(
        {
          id: user.id,
          name: user.name,
          lastname: user.lastname,
          email: user.email,
          role: user.role,
        }
        ))
        // el fetch de login se hace en el componente Login.jsx
    }

    const logout = () => {
        // acá se borra el jwt del localstorage
        setUserJwt(null)
        localStorage.removeItem('jwt')

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