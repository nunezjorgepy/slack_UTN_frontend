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
            </div>
        </footer>
    )
}

export default FooterComponent