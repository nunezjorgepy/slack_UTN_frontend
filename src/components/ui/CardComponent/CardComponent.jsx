import './CardComponent.css'
import { Link } from 'react-router'
import ButtonComponent from '../ButtonComponent/ButtonComponent'

function CardComponent(props) {
    const { 
        card_title, 
        card_p, 
        card_link_text, 
        card_link_to, 
        card_image, 
        card_alt,
        card_type
    } = props

    return (
        <div className={`card-component-container ${card_type}`}> {/*  */}
            <div className={`card-component-header ${card_type}`}>{/*  */}
                {/* Header */}
                <h3 className="card-component-title">
                    {card_title}
                </h3>
                <div className="card-component-paragraph">
                    {card_p}
                </div>
            </div>

            {/* Link */}
            <div className={`card-component-link ${card_type}`}>{/*  */}
                <Link to={card_link_to}>
                    <ButtonComponent 
                        text={card_link_text} 
                        className={'secondary-btn medium-btn'} 
                    />
                </Link>
            </div>

            {/* Image */}
            {card_image 
                ? <div className={`card-component-image ${card_type}`}>{/*  */}
                    <img src={card_image} alt={card_alt} />
                </div>
                : <div className={`card-no-image ${card_type}`}></div> /*  */
            }
        </div>
    )
}

export default CardComponent