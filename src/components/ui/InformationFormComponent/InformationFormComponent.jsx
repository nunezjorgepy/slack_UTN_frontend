import { Link } from 'react-router'
import './InformationFormComponent.css'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import useForm from '../../../hooks/useForm'
import { useEffect } from 'react'
import useRequest from '../../../hooks/useRequest'

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
        loading
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
                {section.section_number && section.section_title &&
                    <div className="form-section-header">
                        <span>{section.section_number}</span>
                        <h2>{section.section_title}</h2>
                    </div>
                }
                <div className="form-section-flex-container">
                    {section.inputs.map((input, index) => (
                        <div key={index} className={`form-section-group ${input.flex}`}>
                            <label htmlFor={input.id} className={input.required ? 'required' : ''}>
                                {input.label}
                            </label>
                            <input 
                                type={input.type} 
                                id={input.id} 
                                name={input.name} 
                                placeholder={input.placeholder}
                                onChange={handleChangeInput}
                                value={formState[input.name]}
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
                <span>{link.text}</span> {' '}
                <Link to={link.link} className='form-footer-link'>
                    {link.link_text}
                </Link>
                <br />
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
                <span className='error-message'>
                    {/* Si el error es del parte del usuario, muestra errorMessage, si no, muestra error.message. De no haber error, muestra un espacio para mantener el tamaño del footer */}
                    {errorMessage ? errorMessage 
                    : error ? error.message : '\u00A0'}
                </span>
                {button.text && <ButtonComponent
                    text={button.text}
                    type={button.type}
                    disabled={loading}
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