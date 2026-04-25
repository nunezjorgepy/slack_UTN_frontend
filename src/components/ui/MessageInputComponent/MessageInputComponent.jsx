const MessageInputComponent = ({ message, setMessage, onSendMessage, loading }) => {
    return (
        <div className="workspace-chat-send-message">
            <form className="workspace-send-message-form-container" onSubmit={onSendMessage}>
                <textarea 
                    className="workspace-send-message-form-textarea" 
                    placeholder="Escribe un mensaje..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                ></textarea>
                <button className="workspace-send-message-form-button" type="submit" disabled={loading}>
                    {!loading && <i className="bi bi-send"></i>}
                </button>
            </form>
        </div>
    )
}

export default MessageInputComponent
