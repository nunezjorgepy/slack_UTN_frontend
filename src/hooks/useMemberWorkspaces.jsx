import { useEffect } from "react";
import useRequest from "./useRequest";
import memberWorkspaceService from "../services/memberWorkspaceSerivce";


function useMemberWorkspaces() {

    const { sendRequest, response, loading, error} = useRequest()

    useEffect(
        () => {
            sendRequest(
                {
                    requestCb: memberWorkspaceService.getActiveWorkspaces
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

export default useMemberWorkspaces