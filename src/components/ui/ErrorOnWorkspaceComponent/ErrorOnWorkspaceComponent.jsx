import { useNavigate } from 'react-router';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import './ErrorOnWorkspaceComponent.css';

const ErrorOnWorkspaceComponent = () => {
    const navigate = useNavigate();

    return (
        <div className='workspace-error-view'>
            <h2 className='workspace-error-title'>No es posible acceder al espacio buscado</h2>
            <p className='workspace-error-subtitle'>Esto puede deberse a las siguientes causas:</p>
            <ul className='workspace-error-list'>
                <li>El espacio no existe</li>
                <li>El espacio está inactivo</li>
                <li>No tienes permiso para acceder al espacio</li>
                <li>No estas logueado</li>
                <li>El identificador es inválido</li>
            </ul>
            <ButtonComponent text="Ir al inicio" onClick={() => navigate('/')} />
        </div>
    );
};

export default ErrorOnWorkspaceComponent;
