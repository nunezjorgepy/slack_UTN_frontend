import React, { useEffect } from 'react';
import { useParams, Link, useSearchParams, useNavigate } from 'react-router';
import useMemberWorkspaces from '../../hooks/useMemberWorkspaces';
import memberWorkspaceService from '../../services/memberWorkspaceService';
import './ResponseToInvitationScreen.css';
import ButtonComponent from '../../components/ui/ButtonComponent/ButtonComponent';

function ResponseToInvitationScreen() {
    const { workspaceId } = useParams();
    const [searchParams] = useSearchParams();
    const response_invitation_token = searchParams.get('token');
    const navigate = useNavigate();

    const { response, loading, error } = useMemberWorkspaces({
        callbackFunction: () => memberWorkspaceService.responseToInvitation(workspaceId, response_invitation_token)
    });


    const message = response?.message || error?.message || "Algo salió mal. Por favor, intenté nuevamente más tarde.";
    const isError = error || (!response?.ok && response !== null);
    // TODO: si el usuario rechaza la invitación, sería mejor mostrar un mensaje de color rojo.


    return (
        <div className="response-invitation-screen form-screens-main">
            <div className="response-invitation-container">
                {
                    loading
                    ?   // Si esta cargando 
                    <div className="response-invitation-loading">
                        <div className="spinner"></div>
                        <h2>Procesando invitación...</h2>
                    </div>
                    :   // Caso contrario
                    <div className={`response-invitation-message ${isError ? 'error' : 'success'}`}>
                        <h2>{message}</h2>
                        <div className="response-invitation-buttons">
                            {/* TODO: Buscar la forma de redirigir al espacio de trabajo, teniendo en cuenta que tengo que pasar un id por defecto. */}
                            {/* {(!isError && !showWorkspaceButton) && 
                                <ButtonComponent
                                    text="Ir al espacio"
                                    onClick={() => navigate(`/workspace/${workspaceId}/channel/${response.channel_id}`)}
                                />
                            } */}
                            <ButtonComponent
                                text="Ir al inicio"
                                onClick={() => navigate("/")}
                            />
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default ResponseToInvitationScreen;