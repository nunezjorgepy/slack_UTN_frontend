import { Link } from "react-router"
import FormInputComponent from "../components/ui/FormInputComponent/FormInputComponent"


const useRenders = ({
    sections,
    footer,
    formState,
    handleChangeInput,
}) => {
    /* 
    ============================================
    Renders para el formulario
    =============================================
    */
    const renderSections = () => {
        return sections.map((section, index) => (
            <div key={index} className="form-section">
                {/* Section header */}
                {section.section_number && section.section_title &&
                    <div className="form-section-header">
                        <span>{section.section_number}</span>
                        <h2>{section.section_title}</h2>
                    </div>
                }
                {/* Section inputs */}
                <div className="form-section-flex-container">
                    {section.inputs.map((input, index) => (
                        <div key={index} className={`form-section-group ${input.flex}`}>
                            <FormInputComponent
                                input={input}
                                handleChangeInput={handleChangeInput}
                                formState={formState}
                            />
                        </div>
                    ))}
                </div>
            </div>
        ))
    }

    const renderFooterLinks = () => {
        return footer.map((link, index) => (
            <div key={index} className='form-footer-links'>
                <div className="form-footer-link">
                    <span>{link.text}</span> {' '}
                    <Link to={link.link} className='form-footer-link'>
                        {link.link_text}
                    </Link>
                </div>
            </div>
        ))
    }

    return {
        renderSections,
        renderFooterLinks
    }
}

export default useRenders