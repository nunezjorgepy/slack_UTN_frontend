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

    console.log(response)

    return {
        response,
        loading,
        error,
        channel: response?.data?.channel,
        messages: response?.data?.messages
    }
}

export default useChannels