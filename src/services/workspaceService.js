import ENVIRONMENT from "../config/environment.config";

const API_URL = ENVIRONMENT.API_URL

const workspaceService = {
    getActiveWorkspaces: async () => {
        const response_http = await fetch(
            API_URL + '/api/membersWorkspace/active',
            {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem(LOCALSTORAGE_TOKEN_KEY)
                }
            }
        )

        const response = await response_http.json()
        return response
    }
}


export default workspaceService