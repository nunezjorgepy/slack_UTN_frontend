import { createContext } from "react";
import workspaceService from "../services/workspaceService";
import useWorkspaces from "../hooks/useWorkspaces";

export const WorkspaceContext = createContext()

const WorkspaceContextProvider = ({ children }) => {
    const getWorkspace = (workspaceId) => {
        const { 
            workspace, 
            members,
            channels,
            member_logged,
            response, 
            loading, 
            error,
            refetch     // TODO: probablemente no lo necesite.
        } = useWorkspaces(
            {
                callbackFunction: () => workspaceService.getWorkspace(workspaceId),
            }
        )

        const workspace_data = {
            workspace,
            members,
            channels,
            member_logged,
            response,
            loading,
            error,
            refetch
        }

        return workspace_data
    }

    const providerValues = {
        getWorkspace
    }

    return (
        <WorkspaceContext.Provider value={providerValues}>
            {children}
        </WorkspaceContext.Provider>
    )
}

export default WorkspaceContextProvider