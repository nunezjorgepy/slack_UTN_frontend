import './SiderbarItemComponent.css'

function SiderbarItemComponent(props) {
    const { input_name, channel_name } = props
    return (
        <label className='siderbar-item-component'>
            <input type='radio' className='siderbar-item-component-input' name={input_name}/>
            <div className="siderbar-item-component-content">
                <div className="siderbar-item-component-icon">
                    <i className="bi bi-hash"></i>
                </div>
                <div className="siderbar-item-component-text">
                    {channel_name}
                </div>
            </div>
        </label>
    )
}

export default SiderbarItemComponent