import './WorkspaceScreen.css'
// React
import { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
// Hooks
import useWorkspaces from '../../hooks/useWorkspaces'
import useChannels from '../../hooks/useChannels'
// Services
import workspaceService from '../../services/workspaceService'
import channelService from '../../services/channelService'
// Components
import SiderbarItemComponent from '../../components/ui/SiderbarItemComponent/SiderbarItemComponent'
// Context
import { AuthContext } from '../../context/authContext'

function WorkspaceScreen() {
    const { workspaceId } = useParams()
    const { manageLogout } = useContext(AuthContext)
    const navigate = useNavigate()
    const [message, setMessage] = useState('')
    const [channelId, setChannelId] = useState(null)

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

    const { 
        channel, 
        messages,
        response: channelResponse, 
        loading: channelLoading, 
        error: channelError 
    } = useChannels(
        {
            callbackFunction: () => channelService.getById(workspaceId, channelId),
            dependencies: [channelId, workspaceId]
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
                <SiderbarItemComponent input_name='member' component_name={member.user_name} />
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
                <SiderbarItemComponent 
                    input_name='channel' 
                    component_name={channel.channel_name} 
                    onClick={() => setChannelId(channel.channel_id)}
                />
            </div>
        ))
    }

    const onSendMessage = (e) => {
        e.preventDefault()
        console.log(message)
    }

    // Cambia el título de la página
    document.title = `${workspace?.title || 'Slack UTN - Workspace'}`

    useEffect(() => {
        if (channels?.length > 0) {
            console.log(channels)
            setChannelId(channels[0].channel_id)
        }
    }, [channels])

    return (
        <div className='backgroung-lienar-gradient'>
            <header className='workspace-header'>
                <div className="workspace-header-icons">
                    {/* Home and Logout icons */}
                    <div className='tooltip workspace-header-btn-home'>
                        <i className="bi bi-house" onClick={() => navigate('/')}></i>
                    </div>
                    <div className='tooltip workspace-header-btn-logout'>
                        <i className="bi bi-box-arrow-right" onClick={manageLogout}></i>
                    </div>
                </div>
                <div className="workspace-header-search-holder">
                    {/* TODO: al hacer click acá, se abre un modal para buscar canales o miembros */}
                    Buscar canales y miembros
                </div>
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
                                <h1 className="workspace-sidebar-header-title">
                                    {workspace?.title || 'Cargando...'}
                                </h1>
                                <div className="workspace-sidebar-header-edit tooltip">
                                    <i className="bi bi-pencil"></i>
                                </div>
                            </div>
                            <div className="workspace-description">
                                <span>Descripción</span>
                                {workspace?.description || 'Cargando...'}
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
                                <ul className="workspace-sidebar-list">
                                    {renderChannels()}
                                </ul>
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
                                <ul className="workspace-sidebar-list">
                                    {renderMembers()}
                                </ul>
                                <button className="workspace-add-item workspace-add-member">
                                    <i className="bi bi-plus"></i>
                                    <span>Invitar miembros</span>
                                </button>
                            </div>
                        </aside>
                        {/* 
                        ===========================================================
                                    Contenedor principal del chat
                        ===========================================================
                        */}
                        <section className="workspace-content">

                            {/* 
                            ===========================================================
                            Chat Header
                            ===========================================================
                            */}
                            <div className="workspace-chat-header">
                                <div className="workspace-channel-info">
                                    <button className="workspace-star-channel">
                                        <i className="bi bi-star"></i>
                                    </button>
                                    <div className="workspace-chat-header-title">
                                        # {channel?.channel_name || 'Cargando...'}
                                    </div>
                                </div>
                                <button className="invite-members">
                                    <i className="bi bi-person-plus"></i>
                                    <span>Invitar miembros</span>
                                </button>
                            </div>

                            {/* 
                            ===========================================================
                            Chat Tabs
                            ===========================================================
                            */}
                            <div className="workspace-chat-tabs">
                                <div className="workspace-tab-container">
                                    <div className="workspace-tab">
                                        <i className="bi bi-chat-dots-fill"></i>
                                        <span className="workspace-tab-title">Mensajes</span>
                                    </div>
                                </div>
                            </div>

                            {/* 
                            ===========================================================
                            Chat Messages
                            ===========================================================
                            */}
                            <div className="workspace-chat-messages">
                                {channelLoading && <div className='siderbar-item-component-content'>Cargando mensajes...</div>}
                                {channelError && <div className='siderbar-item-component-content'>Error al cargar los mensajes</div>}
                                {messages?.length === 0 && <div className='siderbar-item-component-content'>No hay mensajes en este canal</div>}
                                {messages?.map((message) => (
                                    <div key={message.message_id} className='workspace-chat-message-item'>
                                        <div className="workspace-chat-message-user">
                                            {message.user_name}
                                        </div>
                                        <div className="workspace-chat-message-text">
                                            {message.content}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* 
                            ===========================================================
                            Chat Send Message
                            ===========================================================
                            */}
                            <div className="workspace-chat-send-message">
                                <form className="workspace-send-message-form-container" onSubmit={onSendMessage}>
                                    <textarea 
                                        className="workspace-send-message-form-textarea" 
                                        placeholder="Escribe un mensaje..."
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                    ></textarea>
                                    <button className="workspace-send-message-form-button" type="submit">
                                        <i className="bi bi-send"></i>
                                    </button>
                                </form>
                            </div>
                        </section>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default WorkspaceScreen