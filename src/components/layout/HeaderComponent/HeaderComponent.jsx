import { Link } from 'react-router'
import { useContext } from 'react'
import { AuthContext } from '../../../context/authContext'
import './HeaderComponent.css'
import ButtonComponent from '../../ui/ButtonComponent/ButtonComponent'
import { LINKS_TO_OWN_SCREENS } from '../../../constants/general.constants'

function HeaderComponent() {
    const { manageLogout } = useContext(AuthContext)

    return (
        <header className='header-home-container'>
            <nav className="header-home-main-nav">
                <div className="header-home-main-div">
                    {/* Logo */}
                    <Link to="/">
                        <img
                            src="https://a.slack-edge.com/38f0e7c/marketing/img/nav/slack-salesforce-logo-nav-white.png"
                            alt="Logo Slack"
                            className='header-home-logo-image'
                        />
                    </Link>

                    <nav className='header-home-nav-options-container'>
                        {/* Opciones */}
                        <ul className="header-home-options">
                            <li className="header-home-nav-option">
                                <span>Funciones</span>
                                <i className="bi bi-chevron-down"></i>
                            </li>
                            <li className="header-home-nav-option">
                                <span>Soluciones</span>
                                <i className="bi bi-chevron-down"></i>
                            </li>
                            <li className="header-home-nav-option">
                                <span className='header-nav-option-underline'>Empresa</span>
                            </li>
                            <li className="header-home-nav-option">
                                <span>Recursos</span>
                                <i className="bi bi-chevron-down"></i>
                            </li>
                            <li className="header-home-nav-option">
                                <span className='header-nav-option-underline'>Precios</span>
                            </li>
                        </ul>

                    </nav>
                    {/* Crear espacio de trabajo */}                    
                    <Link to={LINKS_TO_OWN_SCREENS.create_workspace}>
                        <ButtonComponent
                            text="Crear un nuevo espacio de trabajo"
                            type="button"
                            className="header-home-create-workspace-btn header-home-btn secondary-btn"
                            disabled={false}
                        />
                    </Link>
                    {/* Cerrar sesión */}
                    <ButtonComponent
                        text="Cerrar sesión"
                        type="button"
                        className="header-home-logout-btn header-home-btn"
                        disabled={false}
                        onClick={ () => manageLogout() }
                    />
                </div>

            </nav>
        </header>
    )
}

export default HeaderComponent