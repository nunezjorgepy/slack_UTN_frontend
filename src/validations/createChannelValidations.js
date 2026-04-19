

export const createChannelValidations = (form_data) => {
    const { name, description } = form_data
    const trimmed_name = name.trim()
    const trimmed_description = description.trim()
    let name_error = ''
    let description_error = ''

    // Validaciones para el nombre
    if (!trimmed_name) {
        name_error = 'El nombre del canal es requerido'
    }
    else if (trimmed_name.length < 3) {
        name_error = 'El nombre del canal debe tener al menos 3 caracteres'
    }
    else if (trimmed_name.length > 50) {
        name_error = 'El nombre del canal debe tener menos de 50 caracteres'
    }

    // Validaciones para la descripcion
    if (trimmed_description && trimmed_description.length < 10) {
        description_error = 'La descripcion debe tener al menos 10 caracteres'
    }
    else if (trimmed_description && trimmed_description.length > 100) {
        description_error = 'La descripcion debe tener menos de 100 caracteres'
    }

    return name_error || description_error || null
}