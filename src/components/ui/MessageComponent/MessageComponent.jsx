import './MessageComponent.css'

function MessageComponent(props) {
    const { message } = props
    const message_date = new Date(message.message_created_at).getHours()
    const message_minutes = new Date(message.message_created_at).getMinutes()
    const avatar = message.user_avatar || "https://cdn-icons-png.flaticon.com/512/149/149071.png"

    return (
        <div className='message-component'>
            <div className='message-component-header'>
                <div className='message-component-header-user'>
                    <div className='message-component-header-user-avatar'>
                        <img src={avatar} alt="Avatar" />
                    </div>
                    <div className='message-component-header-user-name'>
                        <span>{message.message_user_name}</span>
                    </div>
                </div>
                {/* TODO: Agregar la fecha y hora del mensaje */}
                {/* <div className='message-component-header-date'>
                    <span>{message_date < 10 ? `0${message_date}` : message_date}</span>
                    <span>:</span>
                    <span>{message_minutes < 10 ? `0${message_minutes}` : message_minutes}</span>
                </div> */}
            </div>
            <div className='message-component-content'>
                <span>{message.message_content}</span>
            </div>
        </div>
    )
}

export default MessageComponent