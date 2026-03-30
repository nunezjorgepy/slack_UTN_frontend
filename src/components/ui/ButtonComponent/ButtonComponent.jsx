import './ButtonComponent.css'

function ButtonComponent(props) {
    const { text, onClick, disabled, type, className } = props
    return (
        <button 
            className={`primary-btn ${className ? className : ''}`}
            onClick={onClick} 
            disabled={disabled} 
            type={type}
        >
            {text}
        </button>
    )
}

export default ButtonComponent