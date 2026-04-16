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
import messagesService from '../../services/messagesService'
import memberWorkspaceService from '../../services/memberWorkspaceService'
// Components
import SiderbarItemComponent from '../../components/ui/SiderbarItemComponent/SiderbarItemComponent'
import InformationFormComponent from '../../components/ui/InformationFormComponent/InformationFormComponent'
import ButtonComponent from '../../components/ui/ButtonComponent/ButtonComponent'
// Constants
import { ADD_CHANNEL_FORM_CONSTANTS, initialFormState as ADD_CHANNEL_INITIAL_STATE, SUCCES_ADD_CHANNEL_INFO } from '../../constants/addChannelForm.constants'
// Context
import { AuthContext } from '../../context/authContext'
import useRequest from '../../hooks/useRequest'
import MessageComponent from '../../components/ui/MessageComponent/MessageComponent'
import { INVITE_USER_FORM_CONSTANTS, initialFormState as INVITE_USER_INITIAL_STATE, SUCCES_INVITE_USER_INFO } from '../../constants/inviteUserForm.constants'
import { EDIT_WORKSPACE_FORM_CONSTANTS, SUCCES_EDIT_WORKSPACE_INFO } from '../../constants/createWorkspace.constants'

function WorkspaceScreen() {
    const { workspaceId } = useParams()
    const { manageLogout } = useContext(AuthContext)
    const navigate = useNavigate()
    const [message, setMessage] = useState('')
    const [channelId, setChannelId] = useState(null)
    const [showAddChannelModal, setShowAddChannelModal] = useState(false)
    const [showInviteUserModal, setShowInviteUserModal] = useState(false)
    const [showEditWorkspaceModal, setShowEditWorkspaceModal] = useState(false)
    const [showDeleteWorkspaceModal, setShowDeleteWorkspaceModal] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const { sendRequest, response: addChannelResponse, loading: addChannelLoading, error: addChannelError } = useRequest()
    const { sendRequest: inviteUserRequest, response: inviteUserResponse, loading: inviteUserLoading, error: inviteUserError } = useRequest()
    const { sendRequest: sendMessageRequest, response: sendMessageResponse, loading: sendMessageLoading, error: sendMessageError } = useRequest()
    const { sendRequest: editWorkspaceRequest, response: editWorkspaceResponse, loading: editWorkspaceLoading, error: editWorkspaceError } = useRequest()
    const { sendRequest: deleteWorkspaceRequest, response: deleteWorkspaceResponse, loading: deleteWorkspaceLoading, error: deleteWorkspaceError } = useRequest()

    const { 
        workspace, 
        members,
        channels,
        member_logged,
        response, 
        loading, 
        error,
        refetch 
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
        error: channelError,
        refetch: refetchMessages
    } = useChannels(
        {
            callbackFunction: () => channelService.getById(workspaceId, channelId),
            dependencies: [channelId, workspaceId]
        }
    )

    const renderMembers = () => {
        if (loading && !members) {
            return <div className='siderbar-item-component-error'>Cargando...</div>
        }
        if (error) {
            return <div className='siderbar-item-component-error'>Error al cargar los miembros</div>
        }
        if (members?.length === 0) {
            return <div className='siderbar-item-component-error'>No se encontraron miembros</div>
        }
        return members?.map((member) => (
            <div key={member.member_id}>
                <SiderbarItemComponent input_name='member' component_name={member.user_name} />
            </div>
        ))
    }

    const renderChannels = () => {
        if (loading && !channels) {
            return <div className='siderbar-item-component-error'>Cargando...</div>
        }
        if (error) {
            return <div className='siderbar-item-component-error'>Error al cargar los canales</div>
        }
        if (channels?.length === 0) {
            return <div className='siderbar-item-component-error'>No se encontraron canales</div>
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

    const renderMessages = () => {
        if (channelLoading && !messages) {
            return <div className='siderbar-item-component-error messages-error'>Cargando mensajes...</div>
        }
        if (channelError) {
            return <div className='siderbar-item-component-error messages-error'>Error al cargar los mensajes</div>
        }
        if (messages?.length === 0) {
            return <div className='siderbar-item-component-error messages-error'>No hay mensajes en este canal</div>
        }
        return messages?.map((message) => {
            return (
                <div key={message.message_id} className='workspace-chat-message-item'>
                    <MessageComponent message={message} />
                </div>
            )
        })
    }

    const onAddChannel = (form_data, { resetForm }) => {
        // Faltan las valdicaiones
        if (!form_data.name.trim()) {
            setErrorMessage('El nombre del canal es requerido')
            return
        }

        // Validar que el nombre del canal tenga al menos 3 caracteres
        if (form_data.name.trim().length < 3) {
            setErrorMessage('El nombre del canal debe tener al menos 3 caracteres')
            return
        }

        // Validar que el nombre del canal tenga menos de 50 caracteres
        if (form_data.name.trim().length > 50) {
            setErrorMessage('El nombre del canal debe tener menos de 50 caracteres')
            return
        }

        // Si la descripción existe y es menor a 10 caracteres, mostrar error
        if (form_data.description && form_data.description.trim().length < 10) {
            setErrorMessage('La descripción debe tener al menos 10 caracteres')
            return
        }

        // Si la descripción existe y es mayor a 100 caracteres, mostrar error
        if (form_data.description && form_data.description.trim().length > 100) {
            setErrorMessage('La descripción debe tener menos de 100 caracteres')
            return
        }

        try {
            sendRequest({
                requestCb: async () => {
                    const response = await channelService.create(workspaceId, form_data)
                    // Refrescar los canales y cerrar el modal solo si la creación fue exitosa
                    refetch({ requestCb: () => workspaceService.getWorkspace(workspaceId) })
                    resetForm()
                    setShowAddChannelModal(false)
                    return response
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    const onSendMessage = async (e) => {
        e.preventDefault()
        if (!message.trim()) return

        try {
            sendMessageRequest({
                requestCb: async () => {
                    const response = await messagesService.sendMessage(workspaceId, channelId, message)
                    setMessage('')
                    refetchMessages({ requestCb: () => channelService.getById(workspaceId, channelId) })
                    return response
                }
            })
        } catch (error) {
            console.error('Error al enviar el mensaje:', error)
        }
    }

    const onInviteUser = (form_data, { resetForm }) => {
        console.log(form_data)
        try {
            inviteUserRequest({
                requestCb: async () => {
                    const response = await memberWorkspaceService.inviteUser(
                        workspaceId, 
                        form_data.email, 
                        form_data.role
                    )
                    resetForm()
                    return response
                }
            })
        } catch (error) {
            console.error('Error al invitar usuario:', error)
        }
    }
    const onEditWorkspace = (form_data, { resetForm }) => {
        try {
            editWorkspaceRequest({
                requestCb: async () => {
                    const response = await workspaceService.editWorkspace(workspaceId, form_data)
                    // Recargar la página tras 3 segundos para mostrar los cambios
                    setTimeout(() => {
                        window.location.reload()
                    }, 3000)
                    return response
                }
            })
        } catch (error) {
            console.error('Error al editar el espacio de trabajo:', error)
        }
    }

    const onDeleteWorkspace = () => {
        try {
            deleteWorkspaceRequest({
                requestCb: async () => {
                    const response = await workspaceService.softDeleteWorkspace(workspaceId)
                    setTimeout(() => {
                        navigate('/')
                    }, 3000)
                    return response
                }
            })
        } catch (error) {
            console.error('Error al eliminar el espacio de trabajo:', error)
        }
    }

    // Cambia el título de la página
    document.title = `${workspace?.title || 'Slack UTN - Workspace'}`

    useEffect(() => {
        // Por defecto se selecciona el primer canal
        if (channels?.length > 0) {
            setChannelId(channels[0].channel_id)
        }
    }, [channels])

    return (
        <div className='backgroung-lienar-gradient'>
            {(!loading && response && !response.ok) ? (
                <div className='workspace-error-view'>
                    <h2 className='workspace-error-title'>No es posible acceder al espacio buscado</h2>
                    <p className='workspace-error-subtitle'>Esto puede deberse a las siguientes causas:</p>
                    <ul className='workspace-error-list'>
                        <li>El espacio no existe</li>
                        <li>El espacio está inactivo</li>
                        <li>No tienes permiso para acceder al espacio</li>
                        <li>No estas logueado</li>
                        <li>El identificador es inválido</li>
                    </ul>
                    <ButtonComponent text="Ir al inicio" onClick={() => navigate('/')} />
                </div>
            ) : (
                <>
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
                            {/* 
                            ===========================================================
                            Workspace layout
                            ===========================================================
                            */}
                            <div className="workspace-layout">
                                {/* Barra lateral donde se muestran los canales y miembros */}
                                <aside className="workspace-sidebar">
                                    <div className="workspace-sidebar-header">
                                        <h1 className="workspace-sidebar-header-title">
                                            {workspace?.title || 'Cargando...'}
                                        </h1>
                                        {/* Agregar boton para eliminar de fondo rojo, sólo visible para owner */}
                                        {
                                            member_logged?.role === 'owner' &&
                                            <button 
                                                className="workspace-sidebar-header-delete tooltip"
                                                onClick={() => setShowDeleteWorkspaceModal(true)}
                                            >
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        }
                                        {
                                            member_logged?.role === 'owner' &&
                                            <button 
                                                className="workspace-sidebar-header-edit tooltip"
                                                onClick={() => setShowEditWorkspaceModal(true)}
                                            >
                                                <i className="bi bi-pencil"></i>
                                            </button>
                                        }
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
                                        {
                                            (member_logged?.role === 'admin' || member_logged?.role === 'owner') &&
                                            <button 
                                                className="workspace-add-item workspace-add-channel"
                                                onClick={() => setShowAddChannelModal(true)}
                                            >
                                                <i className="bi bi-plus"></i>
                                                <span>Agregar canal</span>
                                            </button>
                                        }
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
                                        {
                                            (member_logged?.role === 'admin' || member_logged?.role === 'owner') &&
                                            <button 
                                                className="workspace-add-item workspace-add-member"
                                                onClick={() => setShowInviteUserModal(true)}
                                            >
                                                <i className="bi bi-plus"></i>
                                                <span>Invitar miembros</span>
                                            </button>
                                        }
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
                                        {
                                            (member_logged?.role === 'admin' || member_logged?.role === 'owner') &&
                                            <button 
                                                className="invite-members"
                                                onClick={() => setShowInviteUserModal(true)}
                                            >
                                                <i className="bi bi-person-plus"></i>
                                                <span>Invitar miembros</span>
                                        </button>}
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
                                        {renderMessages()}
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
                </>
            )}

            {/* 
            ===========================================================
            Add Channel Modal
            ===========================================================
            */}
            {showAddChannelModal && 
            <div className={`workspace-modal`}>
                <div className="workspace-modal-relative">
                    <InformationFormComponent 
                        form_title={ADD_CHANNEL_FORM_CONSTANTS.form_title}
                        form_subtitle={ADD_CHANNEL_FORM_CONSTANTS.form_subtitle}
                        sections={ADD_CHANNEL_FORM_CONSTANTS.sections}
                        button={ADD_CHANNEL_FORM_CONSTANTS.button}
                        initialFormState={ADD_CHANNEL_INITIAL_STATE}
                        successInfo={SUCCES_ADD_CHANNEL_INFO}
                        onSubmitFunction={onAddChannel}
                        errorMessage={errorMessage}
                        error={addChannelError}
                        loading={addChannelLoading}
                    />
                    
                    <button 
                        className="workspace-modal-close-btn"
                        onClick={() => setShowAddChannelModal(false)}
                    >
                        <i className="bi bi-x"></i>
                    </button>
                </div>
            </div>}

            {/* 
            ===========================================================
            Invite User Modal
            ===========================================================
            */}
            {showInviteUserModal && 
            <div className={`workspace-modal`}>
                <div className="workspace-modal-relative">
                    <InformationFormComponent 
                        form_title={INVITE_USER_FORM_CONSTANTS.form_title}
                        form_subtitle={INVITE_USER_FORM_CONSTANTS.form_subtitle}
                        sections={INVITE_USER_FORM_CONSTANTS.sections}
                        button={INVITE_USER_FORM_CONSTANTS.button}
                        initialFormState={INVITE_USER_INITIAL_STATE}
                        successInfo={SUCCES_INVITE_USER_INFO}
                        onSubmitFunction={onInviteUser}
                        errorMessage={errorMessage}
                        error={inviteUserError}
                        loading={inviteUserLoading}
                    />
                    
                    <button 
                        className="workspace-modal-close-btn"
                        onClick={() => setShowInviteUserModal(false)}
                    >
                        <i className="bi bi-x"></i>
                    </button>
                </div>
            </div>}

            {/* 
            ===========================================================
            Edit Workspace Modal
            ===========================================================
            */}
            {showEditWorkspaceModal && 
            <div className={`workspace-modal`}>
                <div className="workspace-modal-relative">
                    <InformationFormComponent 
                        form_title={EDIT_WORKSPACE_FORM_CONSTANTS.form_title}
                        form_subtitle={EDIT_WORKSPACE_FORM_CONSTANTS.form_subtitle}
                        sections={EDIT_WORKSPACE_FORM_CONSTANTS.sections}
                        button={EDIT_WORKSPACE_FORM_CONSTANTS.button}
                        initialFormState={{
                            title: workspace?.title || '',
                            description: workspace?.description || '',
                            url_image: workspace?.url_image || ''
                        }}
                        successInfo={SUCCES_EDIT_WORKSPACE_INFO}
                        onSubmitFunction={onEditWorkspace}
                        errorMessage={errorMessage}
                        error={editWorkspaceError}
                        loading={editWorkspaceLoading}
                    />
                    
                    <button 
                        className="workspace-modal-close-btn"
                        onClick={() => setShowEditWorkspaceModal(false)}
                    >
                        <i className="bi bi-x"></i>
                    </button>
                </div>
            </div>}

            {showDeleteWorkspaceModal && 
            <div className={`workspace-modal`}>
                <div className="workspace-modal-relative delete-workspace-modal-container">
                    <div className="information-form-component-container">
                        <h2 className="information-form-component-title">Eliminar espacio de trabajo</h2>
                        <span className="information-form-component-subtitle">
                            ¿Estás seguro de que deseas eliminar el espacio de trabajo <b>{workspace?.title}</b>?
                        </span>
                        
                        <div className="information-form-component-section-preview">
                            <p>
                                Esta acción es irreversible. Se borrará <b>TODA</b> la información del espacio de trabajo: 
                                el espacio, los canales, los miembros y los mensajes.
                            </p>
                        </div>

                        {deleteWorkspaceResponse && (
                            <div className="information-form-component-success">
                                {'Espacio de trabajo eliminado con éxito. Redirigiendo...'}
                            </div>
                        )}

                        {deleteWorkspaceError && (
                            <div className="information-form-component-error">
                                {deleteWorkspaceError.message || 'Ocurrió un error al eliminar el espacio de trabajo.'}
                            </div>
                        )}

                        <div className="information-form-component-btns-container">
                            <ButtonComponent 
                                text="Cancelar" 
                                onClick={() => setShowDeleteWorkspaceModal(false)} 
                            />
                            <ButtonComponent 
                                text="Eliminar" 
                                className="warning-btn"
                                onClick={onDeleteWorkspace}
                                disabled={deleteWorkspaceLoading}
                            />
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default WorkspaceScreen