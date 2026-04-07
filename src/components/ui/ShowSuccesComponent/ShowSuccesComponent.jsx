import { Link } from 'react-router'
import './ShowSuccesComponent.css'
import { LINKS_TO_OWN_SCREENS } from '../../../constants/general.constants'

function ShowSuccesComponent(props) {
    const { title, body, footer } = props.data
    
    return (
        <div className='show-succes-container'>
            <div className="show-succes-header">
                <h2>{title}</h2>
            </div>
            <div className="show-succes-body">
                <p>{body}</p>
            </div>
            <div className="show-succes-footer">
                {footer && <p>{footer.text}</p>}
                {footer && <Link to={footer.link} onClick={footer.onClick}>{footer.link_text}</Link>}
            </div>
        </div>
    )
}

export default ShowSuccesComponent