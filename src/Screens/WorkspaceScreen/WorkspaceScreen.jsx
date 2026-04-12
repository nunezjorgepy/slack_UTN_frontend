import { useParams } from 'react-router'
import './WorkspaceScreen.css'
import useWorkspaces from '../../hooks/useWorkspaces'
import workspaceService from '../../services/workspaceService'

function WorkspaceScreen() {
    const { workspaceId } = useParams()

    const { 
        workspace, 
        members,
        channels,
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
        <div className='backgroung-lienar-gradient'>
            <header className='workspace-header'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, earum.
            </header>
            <main className='workspace-main'>
                <section className='workspace-section'>
                    <div className="tabs-sidebar">
                        Tabs
                    </div>
                    <div className="workspace-layout">
                        <aside className="workspace-sidebar">
                            
                        </aside>
                        <section className="workspace-content">
                            
                        </section>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default WorkspaceScreen