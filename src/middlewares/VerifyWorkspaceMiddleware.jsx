import { useContext, useEffect } from 'react';
import { useParams, Outlet } from 'react-router';
import useRequest from '../hooks/useRequest';
import WorkspaceNotFoundScreen from '../Screens/WorkspaceNotFoundScreen/WorkspaceNotFoundScreen';
import { WorkspaceContext } from '../context/workspaceContext';

/* 
    TODO: remoldear en caso de ser necesario. Tener en cuenta que lanza un error.    
*/

const VerifyWorkspaceMiddleware = () => {
    /**
     * Descripción: Antes de entrar al espacio de trabajo, verifica que el usuario tenga permisos para entrar.
     * @returns {Screen} - Redirecciona a la página de error si no tiene permisos o a la del espacio si los tiene.
     */
    const { getWorkspace } = useContext(WorkspaceContext)
    const { workspaceId } = useParams();
    const { sendRequest, response, loading } = useRequest();

    useEffect(() => {
        if (workspaceId) {
            sendRequest({
                requestCb: () => getWorkspace(workspaceId)
            });
        }
    }, [workspaceId]);

    // Mientras está cargando o no hay respuesta aún
    if (loading || !response) {
        return (
            <div className='loading-screen'>
                <div className="spinner"></div>
                Cargando espacio...
            </div>
        );
    }

    return (
        <>
            {
                response.ok 
                ? <Outlet /> 
                : <WorkspaceNotFoundScreen />
            }
        </>
    )
};

export default VerifyWorkspaceMiddleware;
