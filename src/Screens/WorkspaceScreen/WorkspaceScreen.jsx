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
            return <div className='siderbar-item-component-content'>Cargando...</div>
        }
        if (error) {
            return <div className='siderbar-item-component-content'>Error al cargar los miembros</div>
        }
        if (members?.length === 0) {
            return <div className='siderbar-item-component-content'>No se encontraron miembros</div>
        }
        return members?.map((member) => (
            <div key={member.member_id}>
                <SiderbarItemComponent input_name='member' component_name={member.user_email} />
            </div>
        ))
    }

    const renderChannels = () => {
        if (loading) {
            return <div className='siderbar-item-component-content'>Cargando...</div>
        }
        if (error) {
            return <div className='siderbar-item-component-content'>Error al cargar los canales</div>
        }
        if (channels?.length === 0) {
            return <div className='siderbar-item-component-content'>No se encontraron canales</div>
        }
        return channels?.map((channel) => (
            <div key={channel.channel_id}>
                <SiderbarItemComponent input_name='channel' component_name={channel.channel_name} />
            </div>
        ))
    }


    // Cambia el título de la página
    document.title = `${workspace?.title || 'Slack UTN - Workspace'}`

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
                                <input type="checkbox" name="channels-checkbox" id="channels-checkbox" />
                                <label htmlFor="channels-checkbox">
                                    <div className="workspace-sidebar-channels-header">
                                        Canales
                                        <i className="bi bi-chevron-down"></i>
                                    </div>
                                </label>
                                <div className="workspace-sidebar-list">
                                    {renderChannels()}
                                </div>
                                <button className="workspace-add-item workspace-add-channel">
                                    <i className="bi bi-plus"></i>
                                    <span>Agregar canal</span>
                                </button>
                            </div>
                            {/* 
                            ===========================================================
                            Miembros
                            ===========================================================
                            */}
                            <div className="workspace-sidebar-section workspace-sidebar-members">
                                <input type="checkbox" name="members-checkbox" id="members-checkbox" />
                                <label htmlFor="members-checkbox">
                                    <div className="workspace-sidebar-members-header">
                                        Miembros
                                        <i className="bi bi-chevron-down"></i>
                                    </div>
                                </label>
                                <div className="workspace-sidebar-list">
                                    {renderMembers()}
                                </div>
                                <button className="workspace-add-item workspace-add-member">
                                    <i className="bi bi-plus"></i>
                                    <span>Invitar miembros</span>
                                </button>
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