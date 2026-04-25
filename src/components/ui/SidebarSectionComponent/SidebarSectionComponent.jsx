import './SidebarSectionComponent.css'

const SidebarSectionComponent = ({ 
    title, 
    id, 
    children, 
    showAddButton, 
    onAddClick, 
    addButtonText 
}) => {
    return (
        <div className={`workspace-sidebar-section workspace-sidebar-${id}`}>
            <input type="checkbox" name={`${id}-checkbox`} id={`${id}-checkbox`} />
            <label htmlFor={`${id}-checkbox`}>
                <div className="workspace-sidebar-section-header">
                    {title}
                    <i className="bi bi-chevron-down"></i>
                </div>
            </label>
            <ul className="workspace-sidebar-list">
                {children}
            </ul>
            {showAddButton && (
                <button 
                    className={`workspace-add-item workspace-add-${id}`}
                    onClick={onAddClick}
                >
                    <i className="bi bi-plus"></i>
                    <span>{addButtonText}</span>
                </button>
            )}
        </div>
    )
}

export default SidebarSectionComponent
