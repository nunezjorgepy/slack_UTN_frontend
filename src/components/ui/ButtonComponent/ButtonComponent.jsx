import './ButtonComponent.css'

function ButtonComponent(props) {
    const { text, onClick, disabled, type, className } = props
    return (
        <button 
            className={`primary-btn ${className ? className : ''} ${disabled ? 'searching' : ''}`}
            onClick={onClick} 
            disabled={disabled} 
            type={type}
        >
            {disabled ? '' : text}
        </button>
    )
}

export default ButtonComponent