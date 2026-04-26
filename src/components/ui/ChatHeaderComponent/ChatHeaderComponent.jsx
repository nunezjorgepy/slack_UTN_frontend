const ChatHeaderComponent = ({ 
    channelName, 
    onInviteClick, 
    showInviteButton,
    onEditClick,
    onDeleteClick,
    showActions
}) => {
    return (
        <div className="workspace-chat-header">
            <div className="workspace-channel-info">
                {/* <button className="workspace-star-channel">
                    <i className="bi bi-star"></i>
                </button> */}
                <div className="workspace-chat-header-title">
                    # {channelName || 'Cargando...'}
                </div>
                {showActions && (
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button className="channel-action-btn tooltip edit-channel-tooltip" onClick={onEditClick}>
                            <i className="bi bi-pencil"></i>
                        </button>
                        <button className="channel-action-btn tooltip delete-channel-tooltip" onClick={onDeleteClick}>
                            <i className="bi bi-trash"></i>
                        </button>
                    </div>
                )}
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
