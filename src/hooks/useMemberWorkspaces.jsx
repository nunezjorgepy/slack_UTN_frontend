import { useEffect } from "react";
import useRequest from "./useRequest";
import memberWorkspaceService from "../services/memberWorkspaceSerivce";


function useMemberWorkspaces({
    callbackFunction
}) {

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
        workspaces: response?.data?.activeUserWorkspaces,
        members: response?.data?.memberList
    }
}

export default useMemberWorkspaces