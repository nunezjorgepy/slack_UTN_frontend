import { useEffect } from "react";
import useRequest from "./useRequest";


function useWorkspaces({ callbackFunction }) {

    const { sendRequest, response, loading, error} = useRequest()

    useEffect(
        () => {
            sendRequest(
                {
                    requestCb: callbackFunction
                }
            )
        },
        []
    )

    return {
        response,
        loading,
        error,
        workspace: response?.data?.workspace
    }
}

export default useWorkspaces