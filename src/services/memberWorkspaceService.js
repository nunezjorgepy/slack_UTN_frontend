import ENVIRONMENT from "../config/environment.config";
import { LOCALSTORAGE_AUTH_TOKEN_KEY } from "../context/authContext";

const API_URL = ENVIRONMENT.API_URL

const memberWorkspaceService = {
    // Invite User
    inviteUser: async (workspaceId, email, role) => {
        const response_http = await fetch(
            API_URL + '/api/workspace/' + workspaceId + '/member/invite',
            {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem(LOCALSTORAGE_AUTH_TOKEN_KEY),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    role: role
                })
            }
        )

        const response = await response_http.json()
        return response
    },
    // Response to Invitation
    responseToInvitation: async (workspaceId) => {
        const response_http = await fetch(
            API_URL + '/api/workspace/' + workspaceId + '/member/response-to-invitation',
            {
                method: 'PATCH',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem(LOCALSTORAGE_AUTH_TOKEN_KEY),
                    'Content-Type': 'application/json'
                }
            }
        )

        const response = await response_http.json()
        return response
    }
}


export default memberWorkspaceService