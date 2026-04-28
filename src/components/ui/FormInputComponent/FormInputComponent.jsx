import React from 'react'

function FormInputComponent({input, handleChangeInput, formState}) {
    return (
        <div className={`form-section-group ${input.flex}`}>
            <label htmlFor={input.id} className={input.required ? 'required' : ''}>
                {input.label} {!input.required && ' (opcional)'}
                {
                    /* Mostrar ayuda si tiene requisitos */
                    input.requirements &&
                    <span className='form-help'>
                        <i className="bi bi-question form-help-icon"></i>
                        <div className='form-help-requirement-container'>
                            <div>Este campo es {input.required ? 'obligatorio' : 'opcional. Si lo usas:'}</div>
                            <div className='form-help-requires'>Requisitos:</div>
                            <ul>
                                {input.requirements.map((requirement, index) => (
                                    <li key={index} className='form-help-list-item'>&bull; {requirement}</li>
                                ))}
                            </ul>
                        </div>
                    </span>
                }
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
    )
}

export default FormInputComponent