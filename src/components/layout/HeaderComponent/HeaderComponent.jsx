import { Link } from 'react-router'
import './HeaderComponent.css'
import { useContext } from 'react'
import { AuthContext } from '../../../context/authContext'
import ButtonComponent from '../../ui/ButtonComponent/ButtonComponent'
import { LINKS_TO_OWN_SCREENS } from '../../../constants/general.constants'

function HeaderComponent() {
    const { isLogged, manageLogout } = useContext(AuthContext)

    return (
        <header>
            <div className='logout'>
                {isLogged && (
                    <ButtonComponent
                        text="Cerrar Sesión"
                        onClick={manageLogout}
                        className='secondary-btn'
                    />
                )}
            </div>
            <nav>
                <ul className='header-link-list'>
                    <li className='header-link'>
                        <Link to="/">Home</Link>
                    </li>
                    <li className='header-link'>
                        <Link to={LINKS_TO_OWN_SCREENS.login}>Log In</Link>
                    </li>
                    <li className='header-link'>
                        <Link to={LINKS_TO_OWN_SCREENS.register}>Register</Link>
                    </li>
                    <li className='header-link'>
                        <Link to={LINKS_TO_OWN_SCREENS.reset_password_request}>Solicitar Cambio de Contraseña</Link>
                    </li>
                    <li className='header-link'>
                        <Link to={LINKS_TO_OWN_SCREENS.development}>Development</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default HeaderComponent