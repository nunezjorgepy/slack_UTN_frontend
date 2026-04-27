import './FooterComponent.css'
import SOCIAL_MEDIA from '../../../constants/socialMedia.constants'
import { Link } from 'react-router'

function FooterComponent() {
    const renderSocialLinks = () => {
        return SOCIAL_MEDIA.map((social) => (
            <li key={social.name}>
                <Link to={social.url} target="_blank" rel="noopener noreferrer">
                    <i className={social.icon}></i>
                </Link>
            </li>
        ))
    }

    return (
        <footer className="o-footer">
            <div className='footer-container'>
                {/* Fila superior con selector de región y redes sociales */}
                <div className='footer-upper-row'>
                    <div className='footer-upper-row-left'>
                        <span className='footer-country-selector-icon'>
                            <i className="bi bi-globe"></i>
                        </span>
                        <p className='footer-country-selector'>Cambiar Región</p>
                    </div>
                    <div className='footer-upper-row-right'>
                        <ul className='footer-social-list'>
                            {renderSocialLinks()}
                        </ul>
                    </div>
                </div>

                {/* Fila inferior para legales */}
                <div className="footer-lower-row">
                    {/* Links */}
                    <div className="footer-legal-links">
                        <Link to={'https://slack.com/intl/es-ar/get'} className='footer-legal-link'>
                            Descarga Slack
                        </Link>
                        <ul className='footer-links-list'>
                            <li className='footer-link-item'>
                                <Link to={'https://slack.com/intl/es-ar/trust/privacy/privacy-policy'}>
                                    Privacidad
                                </Link>
                            </li>
                            <li>
                                <Link to={'https://slack.com/intl/es-ar/legal'}>
                                    Términos
                                </Link>
                            </li>
                            <li>
                                <Link to={'/'}>
                                    Preferencias de cookies
                                </Link>
                            </li>
                            <li>
                                <Link to={'https://www.salesforce.com/form/other/privacy-request/'}>
                                    Sus opciones de privacidad
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legales */}
                    <small className="footer-legal-text">
                        ©2026 Slack Technologies, LLC, una empresa de Salesforce. Todos los derechos reservados. Las distintas marcas comerciales pertenecen a sus respectivos propietarios.
                    </small>
                </div>
            </div>
        </footer>
    )
}

export default FooterComponent