import { useEffect } from "react"
import useRequest from "./useRequest"


const useChannels = ({ callbackFunction, dependencies = [] }) => {
    const { sendRequest, response, loading, error } = useRequest()

    useEffect(
        () => {
            sendRequest(
                {
                    requestCb: callbackFunction
                }
            )
        },
        dependencies
    )

    return {
        response,
        loading,
        error,
        workspace: response?.data?.workspace,
        members: response?.data?.members,
        member_logged: response?.data?.member_logged,
        channels: response?.data?.channels,
        channel: response?.data?.channel,
        messages: response?.data?.messages,
        refetch: sendRequest
    }
}

export default useChannels