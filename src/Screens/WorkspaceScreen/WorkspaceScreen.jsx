import { useParams } from 'react-router'
import './WorkspaceScreen.css'
import useWorkspaces from '../../hooks/useWorkspaces'
import workspaceService from '../../services/workspaceService'
import SiderbarItemComponent from '../../components/ui/SiderbarItemComponent/SiderbarItemComponent'

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

    const renderChannels = () => {
        if (loading) {
            return <div>Cargando...</div>
        }
        if (error) {
            return <div>Error al cargar los canales</div>
        }
        if (!channels) {
            return <div>No se encontraron canales</div>
        }
        return channels.map((channel) => (
            <div key={channel.channel_id}>
                {channel.channel_name}
            </div>
        ))
    }

    console.log(channels)

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
                        {/* Barra lateral donde se muestran los canales y miembros */}
                        <aside className="workspace-sidebar">
                            <div className="workspace-sidebar-header">
                                <div className="workspace-sidebar-header-title">
                                    {workspace?.title}
                                </div>
                                <div className="workspace-sidebar-header-edit">
                                    <i className="bi bi-pencil"></i>
                                </div>
                            </div>
                            {/* 
                            ===========================================================
                            Canales
                            ===========================================================
                            */}
                            <div className="workspace-sidebar-section workspace-sidebar-channels">
                                <div className="workspace-sidebar-channels-header">
                                    Canales
                                    <i className="bi bi-chevron-down"></i>
                                </div>
                                <div className="workspace-sidebar-list">
                                    <SiderbarItemComponent input_name='channel' />
                                    <SiderbarItemComponent input_name='channel' />
                                    <SiderbarItemComponent input_name='channel' />
                                    <SiderbarItemComponent input_name='channel' />
                                </div>
                            </div>
                            {/* 
                            ===========================================================
                            Miembros
                            ===========================================================
                            */}
                            <div className="workspace-sidebar-section workspace-sidebar-members">
                                <div className="workspace-sidebar-members-header">
                                    Miembros
                                    <i className="bi bi-chevron-down"></i>
                                </div>
                                <div className="workspace-sidebar-list">
                                    <SiderbarItemComponent input_name='member' />
                                    <SiderbarItemComponent input_name='member' />
                                    <SiderbarItemComponent input_name='member' />
                                    <SiderbarItemComponent input_name='member' />
                                </div>
                            </div>
                        </aside>
                        {/* Contenedor principal donde se muestra el contenido del canal */}
                        <section className="workspace-content">
                            
                        </section>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default WorkspaceScreen