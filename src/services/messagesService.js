import ENVIRONMENT from "../config/environment.config";
import { LOCALSTORAGE_AUTH_TOKEN_KEY } from "../context/authContext";

const API_URL = ENVIRONMENT.API_URL

const messagesService = {
    sendMessage: async (workspaceId, channelId, content) => {
        const response_http = await fetch(
            API_URL + '/api/workspace/' + workspaceId + '/channel/' + channelId + '/message',
            {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem(LOCALSTORAGE_AUTH_TOKEN_KEY),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ content })
            }
        )

        const response = await response_http.json()
        return response
    }
}

export default messagesService