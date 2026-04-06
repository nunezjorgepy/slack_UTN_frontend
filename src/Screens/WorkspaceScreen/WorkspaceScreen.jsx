import { useParams } from 'react-router'
import './WorkspaceScreen.css'
import useWorkspaces from '../../hooks/useWorkspaces'
import workspaceService from '../../services/workspaceService'

function WorkspaceScreen() {
    const { workspaceId } = useParams()

    const { 
        workspace, 
        members,
        response, 
        loading, 
        error 
    } = useWorkspaces(
        {
            callbackFunction: () => workspaceService.getWorkspace(workspaceId),
        }
    )

    const renderMembers = () => {
        if (loading) {
            return <div>Cargando...</div>
        }
        if (error) {
            return <div>Error al cargar los miembros</div>
        }
        if (!members) {
            return <div>No se encontraron miembros</div>
        }
        return members.map((member) => (
            <div key={member.member_id}>
                {member.user_email}
            </div>
        ))
    }

    const renderWorkspace = () => {
        if (loading) {
            return <div>Cargando...</div>
        }
        if (error) {
            return <div>Error al cargar el espacio de trabajo</div>
        }
        if (!workspace) {
            return <div>No se encontró el espacio de trabajo</div>
        }
        return (
            <div>
                {workspace.title}
                <br />
                {workspace.description}
            </div>
        )
    }

    // Cambia el título de la página
    document.title = `Slack UTN - ${workspace?.title || 'Workspace'}`

    return (
        <>
            <div className='title'>
                <h3>Miembros del espacio de trabajo</h3>
            </div>
            <div className='workspace-container'>
                {renderWorkspace()}
            </div>
            <br />
            <div className='members-container'>
                {renderMembers()}
            </div>
        </>
    )
}

export default WorkspaceScreen