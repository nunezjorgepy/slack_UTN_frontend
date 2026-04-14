import ENVIRONMENT from "../config/environment.config"
import { LOCALSTORAGE_AUTH_TOKEN_KEY } from "../context/authContext"

const API_URL = ENVIRONMENT.API_URL

const channelService = {
    create: async (workspaceId, channel) => {
        const response_http = await fetch(
            API_URL + '/api/workspace/' + workspaceId + '/channel',
            {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem(LOCALSTORAGE_AUTH_TOKEN_KEY),
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(channel)
            }
        )

        const response = await response_http.json()
        return response
    },
    getById: async (workspaceId, channelId) => {
        const response_http = await fetch(
            API_URL + '/api/workspace/' + workspaceId + '/channel/' + channelId,
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

export default channelService