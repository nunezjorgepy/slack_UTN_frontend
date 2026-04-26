import './ModalDeleteComponent.css'

const ModalDeleteComponent = ({ children, className = '' }) => {
    return (
        <div className={`modal-delete-backdrop ${className}`}>
            <div className="modal-delete-content">
                {children}
            </div>
        </div>
    )
}

export default ModalDeleteComponent
