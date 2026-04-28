import './ChannelScreen.css'
// React
import { useContext, useEffect, useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router'
// Hooks
import useRequest from '../../hooks/useRequest'
import useChannels from '../../hooks/useChannels'
import useChannelModals from '../../hooks/useChannelModals'
import useChannelActions from '../../hooks/useChannelActions'
// Services
import channelService from '../../services/channelService'
// Components
import SiderbarItemComponent from '../../components/ui/SiderbarItemComponent/SiderbarItemComponent'
import InformationFormComponent from '../../components/ui/InformationFormComponent/InformationFormComponent'
import ButtonComponent from '../../components/ui/ButtonComponent/ButtonComponent'
import SidebarSectionComponent from '../../components/ui/SidebarSectionComponent/SidebarSectionComponent'
import ModalComponent from '../../components/ui/ModalComponent/ModalComponent'
import ChatHeaderComponent from '../../components/ui/ChatHeaderComponent/ChatHeaderComponent'
import MessageListComponent from '../../components/ui/MessageListComponent/MessageListComponent'
import MessageInputComponent from '../../components/ui/MessageInputComponent/MessageInputComponent'
import ModalDeleteComponent from '../../components/ui/ModalDeleteComponent/ModalDeleteComponent'
import LoadingComponent from '../../components/ui/LoadingComponent/LoadingComponent'
import ErrorOnWorkspaceComponent from '../../components/ui/ErrorOnWorkspaceComponent/ErrorOnWorkspaceComponent'
// Constants
import { ADD_CHANNEL_FORM_CONSTANTS, initialFormState as ADD_CHANNEL_INITIAL_STATE, SUCCES_ADD_CHANNEL_INFO } from '../../constants/addChannelForm.constants'
import { INVITE_USER_FORM_CONSTANTS, initialFormState as INVITE_USER_INITIAL_STATE, SUCCES_INVITE_USER_INFO } from '../../constants/inviteUserForm.constants'
import { EDIT_WORKSPACE_FORM_CONSTANTS, SUCCES_EDIT_WORKSPACE_INFO } from '../../constants/createWorkspace.constants'
import { MEMBER_ROLES } from '../../constants/role.constants'
// Context
import { AuthContext } from '../../context/authContext'

function ChannelScreen() {
    const { workspaceId, channelId } = useParams()
    const { manageLogout } = useContext(AuthContext)
    const navigate = useNavigate()
    const [message, setMessage] = useState('')
    const [showSidebar, setShowSidebar] = useState(false)
    const [isTransitioning, setIsTransitioning] = useState(true)
    const messagesEndRef = useRef(null)

    const { sendRequest: addChannelRequest, response: addChannelResponse, loading: addChannelLoading, error: addChannelError, cleanRequest: cleanAddChannel } = useRequest()
    const { sendRequest: inviteUserRequest, response: inviteUserResponse, loading: inviteUserLoading, error: inviteUserError, cleanRequest: cleanInviteUser } = useRequest()
    const { sendRequest: sendMessageRequest, loading: sendMessageLoading, error: sendMessageError, cleanRequest: cleanSendMessage } = useRequest()
    const { sendRequest: editWorkspaceRequest, response: editWorkspaceResponse, loading: editWorkspaceLoading, error: editWorkspaceError, cleanRequest: cleanEditWorkspace } = useRequest()
    const { sendRequest: deleteWorkspaceRequest, response: deleteWorkspaceResponse, loading: deleteWorkspaceLoading, error: deleteWorkspaceError, cleanRequest: cleanDeleteWorkspace } = useRequest()
    const { sendRequest: editChannelRequest, response: editChannelResponse, loading: editChannelLoading, error: editChannelError, cleanRequest: cleanEditChannel } = useRequest()
    const { sendRequest: deleteChannelRequest, response: deleteChannelResponse, loading: deleteChannelLoading, error: deleteChannelError, cleanRequest: cleanDeleteChannel } = useRequest()

    // Información del workspace, miembros, canales y mensajes
    const { 
        workspace, 
        members,
        channels,
        member_logged,
        messages,
        loading, 
        error,
        response,
        refetch
    } = useChannels({
        callbackFunction: () => channelService.getById(workspaceId, channelId),
        dependencies: [channelId, workspaceId]
    })

    // Información del canal actual
    const channel = channels?.find((channel) => channel.channel_id === channelId)

    const { modals, errorMessage, setErrorMessage, openModal, closeModal } = useChannelModals({
        addChannel: cleanAddChannel,
        inviteUser: cleanInviteUser,
        editWorkspace: cleanEditWorkspace,
        deleteWorkspace: cleanDeleteWorkspace,
        editChannel: cleanEditChannel,
        deleteChannel: cleanDeleteChannel
    })

    const { onAddChannel, onSendMessage, onInviteUser, onEditWorkspace, onDeleteWorkspace, onEditChannel, onDeleteChannel } = useChannelActions({
        workspaceId,
        channelId,
        members,
        channels,
        refetchWorkspace: () => refetch({ requestCb: () => channelService.getById(workspaceId, channelId) }),
        refetchMessages: () => refetch({ requestCb: () => channelService.getById(workspaceId, channelId) }),
        setErrorMessage,
        closeModal,
        navigate
    })

    document.title = `${workspace?.title || 'Slack UTN - Workspace'}`

    useEffect(() => {
        if (messages?.length > 0) {
            messagesEndRef.current?.scrollIntoView()
        }
    }, [messages, channelId])

    useEffect(() => {
        setIsTransitioning(true)
    }, [channelId, workspaceId])

    useEffect(() => {
        if (!loading && response) {
            setIsTransitioning(false)
        }
    }, [loading, response])

    const isAdminOrOwner = member_logged?.role === MEMBER_ROLES.admin || member_logged?.role === MEMBER_ROLES.owner
    const isOwner = member_logged?.role === MEMBER_ROLES.owner

    return (
        <>
            {/* Cuando cargo el canal por primera vez o cambio de canal, muestra la pantalla de carga. */}
            {isTransitioning && <LoadingComponent />}

            {response && !response?.ok && <ErrorOnWorkspaceComponent />}
            {workspace && !workspace?.isActive && <ErrorOnWorkspaceComponent />}

            {/* Si sale todo bien, muestro el canal. */}
            <div className='backgroung-lienar-gradient'>
                <header className='workspace-header'>
                    <div className="workspace-header-icons">
                        <div className='workspace-header-btn-menu'>
                            <i className="bi bi-list" onClick={() => setShowSidebar(!showSidebar)}></i>
                        </div>
                        <div className='tooltip workspace-header-btn-home'>
                            <i className="bi bi-house" onClick={() => navigate('/')}></i>
                        </div>
                        <div className='tooltip workspace-header-btn-logout'>
                            <i className="bi bi-box-arrow-right" onClick={manageLogout}></i>
                        </div>
                    </div>
                    <div className="workspace-header-search-holder">
                        Buscar canales y miembros
                    </div>
                </header>

                <main className='workspace-main'>
                    <section className='workspace-section'>
                        <div className="workspace-layout">
                            <aside className={`workspace-sidebar ${showSidebar ? 'active' : ''}`}>
                                <div className="workspace-sidebar-header">
                                    <h1 className="workspace-sidebar-header-title">
                                        {workspace?.title || 'Cargando...'}
                                    </h1>
                                    {isOwner && (
                                        <>
                                            <button className="workspace-sidebar-header-delete delete-workspace-tooltip tooltip-container tooltip" onClick={() => openModal('deleteWorkspace')}>
                                                <i className="bi bi-trash"></i>
                                            </button>
                                            <button className="workspace-sidebar-header-edit edit-workspace-tooltip tooltip-container tooltip" onClick={() => openModal('editWorkspace')}>
                                                <i className="bi bi-pencil"></i>
                                            </button>
                                        </>
                                    )}
                                </div>
                                <div className="workspace-description">
                                    <span>Descripción</span>
                                    {workspace?.description || 'Cargando...'}
                                </div>

                                <SidebarSectionComponent 
                                    title="Canales" 
                                    id="channels"
                                    showAddButton={isAdminOrOwner}
                                    onAddClick={() => openModal('addChannel')}
                                    addButtonText="Agregar canal"
                                >
                                    {loading && !channels ? <div className='siderbar-item-component-error'>Cargando...</div> :
                                     error ? <div className='siderbar-item-component-error'>Error al cargar los canales</div> :
                                     channels?.length === 0 ? <div className='siderbar-item-component-error'>No se encontraron canales</div> :
                                     channels?.map((ch) => (
                                         <SiderbarItemComponent 
                                             key={ch.channel_id}
                                             input_name='channel' 
                                             component_name={ch.channel_name} 
                                             link_to={`/workspace/${workspaceId}/channel/${ch.channel_id}`}
                                             isChecked={ch.channel_id === channelId}
                                             icon="bi bi-hash"
                                         />
                                     ))}
                                </SidebarSectionComponent>

                                <SidebarSectionComponent 
                                    title="Miembros" 
                                    id="members"
                                    showAddButton={isAdminOrOwner}
                                    onAddClick={() => openModal('inviteUser')}
                                    addButtonText="Invitar miembros"
                                >
                                    {loading && !members ? <div className='siderbar-item-component-error'>Cargando...</div> :
                                     error ? <div className='siderbar-item-component-error'>Error al cargar los miembros</div> :
                                     members?.length === 0 ? <div className='siderbar-item-component-error'>No se encontraron miembros</div> :
                                     members?.map((member) => (
                                         <SiderbarItemComponent 
                                             key={member.member_id}
                                             input_name='member' 
                                             component_name={member.user_name} 
                                             icon="bi bi-person"
                                         />
                                     ))}
                                </SidebarSectionComponent>
                            </aside>

                            <section className="workspace-content">
                                <ChatHeaderComponent 
                                    channelName={channel?.channel_name}
                                    showInviteButton={isAdminOrOwner}
                                    onInviteClick={() => openModal('inviteUser')}
                                    onEditClick={() => openModal('editChannel')}
                                    onDeleteClick={() => openModal('deleteChannel')}
                                    showActions={isAdminOrOwner}
                                />

                                <div className="workspace-chat-tabs">
                                    <div className="workspace-tab-container">
                                        <div className="workspace-tab">
                                            <i className="bi bi-chat-dots-fill"></i>
                                            <span className="workspace-tab-title">Mensajes</span>
                                        </div>
                                    </div>
                                </div>

                                <MessageListComponent 
                                    messages={messages}
                                    loading={loading}
                                    error={error}
                                    messagesEndRef={messagesEndRef}
                                />

                                <MessageInputComponent 
                                    message={message}
                                    setMessage={setMessage}
                                    onSendMessage={(e) => onSendMessage(e, message, setMessage, sendMessageRequest)}
                                    loading={sendMessageLoading}
                                />
                            </section>
                        </div>
                    </section>
                </main>
            </div>

            {modals.addChannel && (
                <ModalComponent onClose={() => closeModal('addChannel')}>
                    <InformationFormComponent 
                        {...ADD_CHANNEL_FORM_CONSTANTS}
                        initialFormState={ADD_CHANNEL_INITIAL_STATE}
                        successInfo={SUCCES_ADD_CHANNEL_INFO}
                        onSubmitFunction={(data, reset) => onAddChannel(data, reset, addChannelRequest)}
                        errorMessage={errorMessage}
                        error={addChannelError}
                        loading={addChannelLoading}
                        response={addChannelResponse}
                    />
                </ModalComponent>
            )}

            {modals.inviteUser && (
                <ModalComponent onClose={() => closeModal('inviteUser')}>
                    <InformationFormComponent 
                        {...INVITE_USER_FORM_CONSTANTS}
                        initialFormState={INVITE_USER_INITIAL_STATE}
                        successInfo={SUCCES_INVITE_USER_INFO}
                        onSubmitFunction={(data, reset) => onInviteUser(data, reset, inviteUserRequest)}
                        errorMessage={errorMessage}
                        error={inviteUserError}
                        loading={inviteUserLoading}
                        response={inviteUserResponse}
                    />
                </ModalComponent>
            )}

            {modals.editWorkspace && (
                <ModalComponent onClose={() => closeModal('editWorkspace')}>
                    <InformationFormComponent 
                        {...EDIT_WORKSPACE_FORM_CONSTANTS}
                        initialFormState={{
                            title: workspace?.title || '',
                            description: workspace?.description || '',
                            url_image: workspace?.url_image || ''
                        }}
                        successInfo={SUCCES_EDIT_WORKSPACE_INFO}
                        onSubmitFunction={(data) => onEditWorkspace(data, editWorkspaceRequest)}
                        errorMessage={errorMessage}
                        error={editWorkspaceError}
                        loading={editWorkspaceLoading}
                        response={editWorkspaceResponse}
                    />
                </ModalComponent>
            )}

            {modals.deleteWorkspace && (
                <ModalDeleteComponent>
                    <div className="information-form-component-container">
                        <h2 className="information-form-component-title">Eliminar espacio de trabajo</h2>
                        <span className="information-form-component-subtitle">
                            ¿Estás seguro de que deseas eliminar el espacio de trabajo <b>{workspace?.title}</b>?
                        </span>
                        <div className="information-form-component-section-preview">
                            <p>Esta acción es irreversible. Se borrará <b>TODA</b> la información del espacio de trabajo.</p>
                        </div>
                        {deleteWorkspaceResponse && <div className="information-form-component-success">Espacio de trabajo eliminado con éxito. Redirigiendo...</div>}
                        {deleteWorkspaceError && <div className="information-form-component-error">{deleteWorkspaceError.message || 'Error al eliminar.'}</div>}
                        <div className="information-form-component-btns-container">
                            <ButtonComponent text="Cancelar" onClick={() => closeModal('deleteWorkspace')} />
                            <ButtonComponent text="Eliminar" className="warning-btn" onClick={() => onDeleteWorkspace(deleteWorkspaceRequest)} disabled={deleteWorkspaceLoading} />
                        </div>
                    </div>
                </ModalDeleteComponent>
            )}

            {modals.editChannel && (
                <ModalComponent onClose={() => closeModal('editChannel')}>
                    <InformationFormComponent 
                        {...ADD_CHANNEL_FORM_CONSTANTS}
                        form_title="Editar canal"
                        form_subtitle="Modifica los datos del canal"
                        button={{ text: "Guardar cambios", type: "submit" }}
                        initialFormState={{
                            name: channel?.channel_name || '',
                            description: channel?.channel_description || ''
                        }}
                        onSubmitFunction={(data) => onEditChannel(data, editChannelRequest)}
                        errorMessage={errorMessage}
                        error={editChannelError}
                        loading={editChannelLoading}
                        response={editChannelResponse}
                    />
                </ModalComponent>
            )}

            {modals.deleteChannel && (
                <ModalDeleteComponent>
                    <div className="information-form-component-container">
                        <h2 className="information-form-component-title">Eliminar canal</h2>
                        <span className="information-form-component-subtitle">
                            ¿Estas seguro de que deseas eliminar el canal <strong>{channel?.channel_name}</strong>?
                        </span>
                        <div className="information-form-component-section-preview">
                            <p>Esta acción es irreversible. Se borrará el canal y todos sus mensajes.</p>
                        </div>
                        {deleteChannelResponse && <div className="information-form-component-success">Canal eliminado con éxito. Redirigiendo...</div>}
                        {deleteChannelError || errorMessage && <div className="information-form-component-error">{deleteChannelError?.message || errorMessage || 'Error al eliminar.'}</div>}
                        <div className="information-form-component-btns-container">
                            <ButtonComponent text="Cancelar" onClick={() => closeModal('deleteChannel')} />
                            <ButtonComponent text="Eliminar" className="warning-btn" onClick={() => onDeleteChannel(channels, deleteChannelRequest)} disabled={deleteChannelLoading} />
                        </div>
                    </div>
                </ModalDeleteComponent>
            )}

        </>
    )
}

export default ChannelScreen