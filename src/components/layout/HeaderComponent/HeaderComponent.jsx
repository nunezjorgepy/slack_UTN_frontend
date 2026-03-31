import { Link } from 'react-router'
import './HeaderComponent.css'
import { useContext } from 'react'
import { AuthContext } from '../../../context/authContext'
import ButtonComponent from '../../ui/ButtonComponent/ButtonComponent'

function HeaderComponent() {
    const { isLogged, manageLogout } = useContext(AuthContext)

    return (
        <header>
            <div className='logout'>
                {isLogged && (
                    <ButtonComponent
                        text="Cerrar Sesión"
                        onClick={manageLogout}
                        /* 
                        TODO: no sé por qué no funciona el className
                        className='secondary-btn' 
                        */
                    />
                )}
            </div>
            <nav>
                <ul className='header-link-list'>
                    <li className='header-link'>
                        <Link to="/">Home</Link>
                    </li>
                    <li className='header-link'>
                        <Link to="/login">Log In</Link>
                    </li>
                    <li className='header-link'>
                        <Link to="/register">Register</Link>
                    </li>
                    <li className='header-link'>
                        <Link to="/reset-password-request">Cambiar Contraseña</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default HeaderComponent