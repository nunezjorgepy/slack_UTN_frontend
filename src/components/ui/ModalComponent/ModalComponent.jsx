import './ModalComponent.css'

const ModalComponent = ({ children, onClose, className = '' }) => {
    return (
        <div className={`workspace-modal ${className}`}>
            <div className="workspace-modal-relative">
                {children}
                <button 
                    className="workspace-modal-close-btn"
                    onClick={onClose}
                >
                    <i className="bi bi-x"></i>
                </button>
            </div>
        </div>
    )
}

export default ModalComponent
