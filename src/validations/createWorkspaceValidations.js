

export const createWorkspaceValidations = (values) => {
    let name_error = ''
    let description_error = ''
    let url_image_error = ''
    const { title, description, url_image } = values

    /* 
    =======================
    Errores para el título
    =======================
    */
    if (!title) {
        name_error = 'El nombre del espacio de trabajo es requerido';
    }
    // Si tiene menos de 5 caracteres, mostrar error
    else if (title.length < 5) {
        name_error = 'El título del espacio de trabajo debe tener al menos 5 caracteres';
    }
    // Si tiene mas de 50 caracteres, mostrar error
    else if (title.length > 50) {
        name_error = 'El título del espacio de trabajo debe tener menos de 50 caracteres';
    }

    /* 
    ===========================
    Errores para la descripción
    ===========================
    */
    if (description && description.length < 10) {
        description_error = 'La descripción debe tener al menos 10 caracteres';
    }
    else if (description && description.length > 100) {
        description_error = 'La descripción debe tener menos de 100 caracteres';
    }

    /* 
    ===========================
    Errores para la url_image
    ===========================
    */
    // Debe tener los formatos jpg, jpeg o png
    if (url_image && !/\.(jpg|jpeg|png)$/i.test(url_image)) {
        url_image_error = 'La url de la imagen debe tener los formatos jpg, jpeg o png';
    }

    return name_error || description_error || url_image_error || null
}