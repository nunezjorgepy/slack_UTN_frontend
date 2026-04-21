import { useEffect } from "react"
import useRequest from "./useRequest"


const useMessages = ({ callbackFunction, dependencies }) => {
    const { sendRequest, response, loading, error } = useRequest()
    
    useEffect(
        () => {
            sendRequest({
                requestCb: callbackFunction
            })
        }, 
        dependencies
    )

    return {
        response,
        loading,
        error,
        messages: response?.data?.messages,
        refetch: sendRequest
    }
}

export default useMessages