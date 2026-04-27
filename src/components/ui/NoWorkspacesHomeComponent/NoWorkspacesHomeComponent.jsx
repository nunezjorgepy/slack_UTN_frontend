import { Link } from 'react-router'
import './NoWorkspacesHomeComponent.css'
import ButtonComponent from '../ButtonComponent/ButtonComponent'

function NoWorkspacesHomeComponent() {
    return (
        <div className='no-workspaces-home-component'>
            <i className="bi bi-folder-plus"></i>
            <div className="no-workspaces-home-component-text-container">
                <p className='no-workspaces-home-component-text'>No se encontraron espacios de trabajo.</p>
                <p className='no-workspaces-home-component-text'>Hace click en el enlace para empezar.</p>
            </div>
            <Link to="/create-workspace">
                <ButtonComponent
                    text="Crear espacio de trabajo"
                />
            </Link>
        </div>
    )
}

export default NoWorkspacesHomeComponent