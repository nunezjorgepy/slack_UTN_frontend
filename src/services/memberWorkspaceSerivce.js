import ENVIRONMENT from "../config/environment.config";
import { LOCALSTORAGE_AUTH_TOKEN_KEY } from "../context/authContext";

const API_URL = ENVIRONMENT.API_URL

const memberWorkspaceService = {
    getActiveWorkspaces: async () => {
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
    }
}


export default memberWorkspaceService