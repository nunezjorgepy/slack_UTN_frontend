import './InformationFormComponent.css'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import useForm from '../../../hooks/useForm'
import useRenders from '../../../hooks/useRenders'

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
        formState
    } = useForm({ initialFormState, submitFn: onSubmitFunction })

    // Renderizar las secciones
    const { renderSections, renderFooterLinks } = useRenders({ sections, footer, formState, handleChangeInput })

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

                {/* Botón submit del formulario */}
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