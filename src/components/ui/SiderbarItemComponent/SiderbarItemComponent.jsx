import { Link } from 'react-router'
import './SiderbarItemComponent.css'

function SiderbarItemComponent(props) {
    const { input_name, component_name, onClick, link_to } = props
    return (
        <li>
            <Link to={link_to && link_to}>
                <label className='siderbar-item-component' onClick={onClick}>
                    <input type='radio' className='siderbar-item-component-input' name={input_name}/>
                    <div className="siderbar-item-component-content">
                        <div className="siderbar-item-component-icon">
                            <i className="bi bi-hash"></i>
                        </div>
                        <div className="siderbar-item-component-text">
                            {component_name}
                        </div>
                    </div>
                </label>
            </Link>
        </li>
    )
}

export default SiderbarItemComponent