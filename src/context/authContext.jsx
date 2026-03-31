import { createContext, useState } from "react";
import { useNavigate } from "react-router";


export const AuthContext = createContext(
    {
        isLogged: false,
        manageLogin: (auth_token) => {}
    }
)

export const LOCALSTORAGE_AUTH_TOKEN_KEY = 'auth_token'
export const LOCALSTORAGE_REFRESH_TOKEN_KEY = 'refresh_token'

const AuthContextProvider = ({children}) => {
    const [isLogged, setIsLogged] = useState(
        Boolean(localStorage.getItem(LOCALSTORAGE_AUTH_TOKEN_KEY))
    )
    const navigate = useNavigate()

    const manageLogin = (auth_token) => {
        // Guardo el token en el local storage
        localStorage.setItem(LOCALSTORAGE_AUTH_TOKEN_KEY, auth_token)
        // Actualizo el estado
        setIsLogged(true)
        // Navego a la pantalla principal
        navigate('/')
    }

    const manageLogout = () => {
        // Elimino el token del local storage
        localStorage.removeItem(LOCALSTORAGE_AUTH_TOKEN_KEY)
        // Actualizo el estado
        setIsLogged(false)
        // Navego a la pantalla principal
        navigate('/login')
    }

    const providerValues = {
        isLogged,
        manageLogin,
        manageLogout
    }

    return (
        <AuthContext.Provider value={providerValues}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider