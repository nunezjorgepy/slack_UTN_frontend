import { Link } from 'react-router'
import './ShowSuccesComponent.css'
import { LINKS_TO_OWN_SCREENS } from '../../../constants/general.constants'

function ShowSuccesComponent() {
    return (
        <div className='show-succes-container'>
            <div className="show-succes-header">
                <h2>Contraseña cambiada con éxito</h2>
            </div>
            <div className="show-succes-body">
                <p>Ya puedes iniciar sesión con tu nueva contraseña</p>
            </div>
            <div className="show-succes-footer">
                <p>Si la página no te redirige automáticamente, haz clic en el enlace de abajo</p>
                <Link to={LINKS_TO_OWN_SCREENS.login}>Iniciar Sesión</Link>
            </div>
        </div>
    )
}

export default ShowSuccesComponent