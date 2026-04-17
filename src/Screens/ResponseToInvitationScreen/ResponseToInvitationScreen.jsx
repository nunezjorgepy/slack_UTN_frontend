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
    const showWorkspaceButton = response?.message === "Has rechazado la invitación al espacio de trabajo."


    return (
        <div className="response-invitation-screen">
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
                            {/* TODO: Idealmente, si el usuario es parte del espacio, este botpon se muestra igual. */}
                            {(!isError && !showWorkspaceButton) && 
                                <ButtonComponent
                                    text="Ir al espacio"
                                    onClick={() => navigate(`/workspace/${workspaceId}`)}
                                />
                            }
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