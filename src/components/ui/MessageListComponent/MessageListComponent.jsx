// Styles
import './MessageListComponent.css'
// Components
import MessageComponent from '../MessageComponent/MessageComponent'

const MessageListComponent = ({ messages, loading, error, messagesEndRef }) => {
    if (loading && !messages) {
        return <div className='chat-error messages-error'>Cargando mensajes...</div>
    }
    if (error) {
        return <div className='chat-error messages-error'>Error al cargar los mensajes</div>
    }
    if (messages?.length === 0) {
        return <div className='chat-error messages-error'>No hay mensajes en este canal</div>
    }

    return (
        <div className="workspace-chat-messages">
            {messages?.map((message) => (
                <div key={message.message_id} className='workspace-chat-message-item'>
                    <MessageComponent message={message} />
                </div>
            ))}
            <div ref={messagesEndRef} />
        </div>
    )
}

export default MessageListComponent
