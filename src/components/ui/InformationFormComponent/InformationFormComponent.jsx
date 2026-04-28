import { Link } from 'react-router'
import './InformationFormComponent.css'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import useForm from '../../../hooks/useForm'

/* 
    El formulario tendrá un título, un subtítulo y los campos para ingresar la información.
    El título y subtítulo van en la sección form-header.
    Los campos van en la sección form-body.
    El botón de enviar va en la sección form-footer.
*/

function InformationFormComponent(props) {
    const { 
        form_title, 
        form_subtitle, 
        sections, 
        button, 
        footer, 
        initialFormState, 
        onSubmitFunction,
        errorMessage,
        error,
        loading,
        response
    } = props

    const { 
        handleChangeInput, 
        onSubmit, 
        formState, 
        resetForm 
    } = useForm({ initialFormState, submitFn: onSubmitFunction })


    // Renderizar las secciones
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
                            <label htmlFor={input.id} className={input.required ? 'required' : ''}>
                                {input.label} {!input.required && ' (opcional)'}
                                <span className='form-help'>
                                    <i className="bi bi-question form-help-icon"></i>
                                    <div className='form-help-requirement-container'>
                                        <div>Este campo es obligatorio</div>
                                        <div className='form-help-requires'>Requerimientos:</div>
                                        <ul>
                                            <li className='form-help-list-item'>- Primer requerimiento</li>
                                            <li className='form-help-list-item'>- Segundo requerimiento</li>
                                            <li className='form-help-list-item'>- Tercer requerimiento</li>
                                        </ul>
                                    </div>
                                </span>
                            </label>
                            {input.type === 'select' ? (
                                <select 
                                    id={input.id} 
                                    name={input.name} 
                                    onChange={handleChangeInput}
                                    value={formState[input.name]}
                                    required={input.required}
                                >
                                    <option value="" disabled>{input.placeholder}</option>
                                    {input.options.map((option, index) => (
                                        <option key={index} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <input 
                                    type={input.type} 
                                    id={input.id} 
                                    name={input.name} 
                                    placeholder={input.placeholder}
                                    onChange={handleChangeInput}
                                    value={formState[input.name]}
                                    required={input.required}
                                />
                            )}
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

    return (
        <form className='form-container' onSubmit={onSubmit}>
            {/* Header del formulario (si existe) */}
            <div className='form-header'>
                <h1>{form_title && form_title}</h1>
                <span>{form_subtitle && form_subtitle}</span>
            </div>

            {/* Body del formulario */}
            <div className='form-body'>
                {renderSections()}
            </div>

            {/* Footer del formulario */}
            <div className='form-footer'>
                <span 
                    className='error-message'
                    style={response ? { color: response.ok ? 'var(--success-color)' : 'var(--error-color)' } : {}}
                >
                    {/* Prioritizamos el mensaje de la respuesta de la API si existe */}
                    {response ? response.message 
                    : errorMessage ? errorMessage 
                    : error ? error.message : '\u00A0'}
                </span>
                {button.text && <ButtonComponent
                    text={button.text}
                    disabled={loading || (response && response.ok)}
                    type={button.type}
                    className={loading || (response && response.ok) ? 'disabled' : ''}
                />}
                {
                    footer &&
                    renderFooterLinks()
                }
            </div>
        </form>
    )
}

export default InformationFormComponent