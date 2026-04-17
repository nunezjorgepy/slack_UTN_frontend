import { useEffect } from 'react';
import { useParams, Outlet } from 'react-router';
import useRequest from '../hooks/useRequest';
import workspaceService from '../services/workspaceService';
import WorkspaceNotFoundScreen from '../Screens/WorkspaceNotFoundScreen/WorkspaceNotFoundScreen';

const VerifyWorkspaceMiddleware = () => {
    const { workspaceId } = useParams();
    const { sendRequest, response, loading } = useRequest();

    useEffect(() => {
        if (workspaceId) {
            sendRequest({
                requestCb: () => workspaceService.getWorkspace(workspaceId)
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
