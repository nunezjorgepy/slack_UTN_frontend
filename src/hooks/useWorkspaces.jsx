import { useEffect } from "react";
import useRequest from "./useRequest";
import workspaceService from "../services/workspaceService";


function useWorkspaces() {

    const { sendRequest, response, loading, error} = useRequest()

    useEffect(
        () => {
            sendRequest(
                {
                    requestCb: workspaceService.getActiveWorkspaces
                }
            )
        },
        []
    )

    return {
        response,
        loading,
        error,
        workspaces: response?.data?.activeUserWorkspaces
    }
}

export default useWorkspaces