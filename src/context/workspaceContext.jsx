import { createContext } from "react";

export const WorkspaceContext = createContext()

const WorkspaceContextProvider = ({ children }) => {
    // El contexto se mantiene como un contenedor vacío por si en el futuro se desea
    // guardar el estado global de los workspaces. Por ahora, las Screens usan el hook directamente.
    const providerValues = {}

    return (
        <WorkspaceContext.Provider value={providerValues}>
            {children}
        </WorkspaceContext.Provider>
    )
}

export default WorkspaceContextProvider