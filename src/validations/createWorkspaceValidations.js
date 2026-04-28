export const CREATE_WORKSPACE_CONSTANTS = {
    title_min_length: 5,
    title_max_length: 50,
    description_min_length: 10,
    description_max_length: 100,
    url_image_extensions: ['jpg', 'jpeg', 'png']
}

export const createWorkspaceValidations = (values) => {
    /**
     * Descripción: Valida que los inputs del formulario para el espacio de trabajo sean validos. Sirve tanto para crear como para editar.
     * @param {string} title - El título a validar
     * @param {string} description - La descripción a validar
     * @param {string} url_image - La url de la imagen a validar
     * @returns {string|null} - null si los inputs son validos, de lo contrario devuelve un mensaje de error
     */
    let name_error = ''
    let description_error = ''
    let url_image_error = ''
    const { title, description, url_image } = values
    let trimmed_title = title.trim()
    let trimmed_description = description.trim()
    let trimmed_url_image = url_image.trim()

    /* 
    =======================
    Errores para el título
    =======================
    */
    if (!trimmed_title) {
        name_error = 'El nombre del espacio de trabajo es requerido';
    }
    // Si tiene menos de 5 caracteres, mostrar error
    else if (trimmed_title.length < CREATE_WORKSPACE_CONSTANTS.title_min_length) {
        name_error = `El título del espacio de trabajo debe tener al menos ${CREATE_WORKSPACE_CONSTANTS.title_min_length} caracteres`;
    }
    // Si tiene mas de 50 caracteres, mostrar error
    else if (trimmed_title.length > CREATE_WORKSPACE_CONSTANTS.title_max_length) {
        name_error = `El título del espacio de trabajo debe tener menos de ${CREATE_WORKSPACE_CONSTANTS.title_max_length} caracteres`;
    }

    /* 
    ===========================
    Errores para la descripción
    ===========================
    */
    if (trimmed_description && trimmed_description.length < CREATE_WORKSPACE_CONSTANTS.description_min_length) {
        description_error = `La descripción debe tener al menos ${CREATE_WORKSPACE_CONSTANTS.description_min_length} caracteres`;
    }
    else if (trimmed_description && trimmed_description.length > CREATE_WORKSPACE_CONSTANTS.description_max_length) {
        description_error = `La descripción debe tener menos de ${CREATE_WORKSPACE_CONSTANTS.description_max_length} caracteres`;
    }

    /* 
    ===========================
    Errores para la url_image
    ===========================
    */
    // Debe tener los formatos jpg, jpeg o png
    if (trimmed_url_image && !new RegExp(`\\.(${CREATE_WORKSPACE_CONSTANTS.url_image_extensions.join('|')})$`, 'i').test(trimmed_url_image)) {
        url_image_error = `La url de la imagen debe tener los formatos ${CREATE_WORKSPACE_CONSTANTS.url_image_extensions.join(', ')}`;
    }

    return name_error || description_error || url_image_error || null
}