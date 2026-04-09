import ENVIRONMENT from "../config/environment.config";
import { LOCALSTORAGE_AUTH_TOKEN_KEY } from "../context/authContext";

const API_URL = ENVIRONMENT.API_URL

const memberWorkspaceService = {
    // TODO DELETE: eliminar si todo sale bien, ya que no se usa.
    /* getActiveWorkspaces: async () => {
        const response_http = await fetch(
            API_URL + '/api/membersWorkspace/active',
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem(LOCALSTORAGE_AUTH_TOKEN_KEY)
                }
            }
        )

        const response = await response_http.json()
        return response
    }, */
    // Get Member List By workspace_id
    getMemberListByWorkspaceId: async (workspaceId) => {
        const response_http = await fetch(
            API_URL + '/api/membersWorkspace/list/' + workspaceId,
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem(LOCALSTORAGE_AUTH_TOKEN_KEY)
                }
            }
        )

        const response = await response_http.json()
        return response
    }
}


export default memberWorkspaceService