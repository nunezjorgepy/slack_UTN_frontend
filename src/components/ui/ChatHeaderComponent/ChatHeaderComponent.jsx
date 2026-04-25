const ChatHeaderComponent = ({ channelName, onInviteClick, showInviteButton }) => {
    return (
        <div className="workspace-chat-header">
            <div className="workspace-channel-info">
                <button className="workspace-star-channel">
                    <i className="bi bi-star"></i>
                </button>
                <div className="workspace-chat-header-title">
                    # {channelName || 'Cargando...'}
                </div>
            </div>
            {showInviteButton && (
                <button 
                    className="invite-members"
                    onClick={onInviteClick}
                >
                    <i className="bi bi-person-plus"></i>
                    <span>Invitar miembros</span>
                </button>
            )}
        </div>
    )
}

export default ChatHeaderComponent
