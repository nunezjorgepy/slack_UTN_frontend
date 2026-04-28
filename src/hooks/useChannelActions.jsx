import channelService from '../services/channelService'
import messagesService from '../services/messagesService'
import memberWorkspaceService from '../services/memberWorkspaceService'
import workspaceService from '../services/workspaceService'
import { createChannelValidations } from '../validations/createChannelValidations'
import { inviteUserValidations } from '../validations/inviteUserValidations'
import { createWorkspaceValidations } from '../validations/createWorkspaceValidations'

const useChannelActions = ({
    workspaceId,
    channelId,
    members,
    inviteUserResponse,
    refetchWorkspace,
    refetchMessages,
    setErrorMessage,
    closeModal,
    navigate
}) => {
    const onAddChannel = (form_data, { resetForm }, sendRequest) => {
        const channel_error = createChannelValidations({
            name: form_data.name,
            description: form_data.description
        })
        if (channel_error) {
            setErrorMessage(channel_error)
            return
        }
        setErrorMessage('')

        sendRequest({
            requestCb: async () => {
                const response = await channelService.create(workspaceId, form_data)
                
                if (response?.ok && response?.data?.channel?.channel_id) {
                    setTimeout(() => {
                        resetForm()
                        closeModal('addChannel')
                        navigate(`/workspace/${workspaceId}/channel/${response.data.channel.channel_id}`)
                    }, 1500)
                }
                
                return response
            }
        })
    }

    const onSendMessage = async (e, message, setMessage, sendMessageRequest) => {
        e.preventDefault()
        if (!message.trim()) return

        sendMessageRequest({
            requestCb: async () => {
                const response = await messagesService.sendMessage(workspaceId, channelId, message)
                setMessage('')
                refetchMessages()
                return response
            }
        })
    }

    const onInviteUser = (form_data, { resetForm }, inviteUserRequest) => {
        const invite_error = inviteUserValidations(form_data, members)
        if (invite_error) {
            setErrorMessage(invite_error)
            return
        }
        setErrorMessage('')

        inviteUserRequest({
            requestCb: async () => {
                const response = await memberWorkspaceService.inviteUser(
                    workspaceId,
                    form_data.email,
                    form_data.role
                )

                if (response.status === 200) {
                    resetForm()
                    setErrorMessage('Usuario invitado')     /* TODO: acá no debería ir un setErrorMessage, si no algo como setSuccesMessage. */
                    setTimeout(() => {
                        closeModal('inviteUser')
                    }, 1500)
                }
                return response
            }
        })
    }

    const onEditWorkspace = (form_data, editWorkspaceRequest) => {
        let edit_validation_error = createWorkspaceValidations(form_data)
        if (edit_validation_error) {
            setErrorMessage(edit_validation_error)
            return
        }
        setErrorMessage('')

        editWorkspaceRequest({
            requestCb: async () => {
                const response = await workspaceService.editWorkspace(workspaceId, form_data)
                setTimeout(() => {
                    window.location.reload()
                }, 3000)
                return response
            }
        })
    }

    const onDeleteWorkspace = (deleteWorkspaceRequest) => {
        deleteWorkspaceRequest({
            requestCb: async () => {
                const response = await workspaceService.softDeleteWorkspace(workspaceId)
                setTimeout(() => {
                    navigate('/')
                }, 3000)
                return response
            }
        })
    }

    const onEditChannel = (form_data, editChannelRequest) => {
        const channel_error = createChannelValidations({
            name: form_data.name,
            description: form_data.description
        })
        if (channel_error) {
            setErrorMessage(channel_error)
            return
        }
        setErrorMessage('')

        editChannelRequest({
            requestCb: async () => {
                const response = await channelService.updateById(workspaceId, channelId, form_data)
                setTimeout(() => {
                    window.location.reload()
                }, 3000)
                return response
            }
        })
    }

    const onDeleteChannel = (channels, deleteChannelRequest) => {
        if (channels.length <= 1) {
            setErrorMessage('No se puede eliminar el último canal del espacio de trabajo.')
            return
        }
        setErrorMessage('')

        deleteChannelRequest({
            requestCb: async () => {
                const response = await channelService.softDelete(workspaceId, channelId)
                setTimeout(() => {
                    navigate('/')
                }, 3000)
                return response
            }
        })
    }

    return {
        onAddChannel,
        onSendMessage,
        onInviteUser,
        onEditWorkspace,
        onDeleteWorkspace,
        onEditChannel,
        onDeleteChannel
    }
}

export default useChannelActions
