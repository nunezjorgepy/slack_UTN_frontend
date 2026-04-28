export const PASSWORD_VALIDATION_CONSTANTS = {
    password_min_length: 8,
    password_max_length: 20,
}

export const passwordValidation = (password, confirmPassword = '') => {
    /**
     * Descripción: verifica que la contraseña tenga el formato válido y que las contraseñas sean iguales
     * @param {string} password - La contraseña a verificar
     * @returns {string|null} - null si la contraseña es válida, de lo contrario devuelve un mensaje de error
     */
    
    let error = ''  // Variable para almacenar el mensaje de error
    const trimmed_password = password.trim()

    /* Verifico que la contraseña no este vacia */
    if (!trimmed_password) {
        error =  'La contraseña es requerida'
    }
    /* Verifico que la contraseña este entre el rango de 8 y 20 caracteres */
    else if (trimmed_password.length < PASSWORD_VALIDATION_CONSTANTS.minLength) {
        error = `La contraseña debe tener al menos ${PASSWORD_VALIDATION_CONSTANTS.minLength} caracteres.`
    } 
    /* Verifico que la contraseña tenga al menos una letra mayúscula, una letra minúscula, un número y un caracter especial */
    else if (!/[A-Z]/.test(trimmed_password)) {
        error = `La contraseña debe contener al menos una mayúscula.`
    } 
    else if (!/[a-z]/.test(trimmed_password)) {
        error = `La contraseña debe contener al menos una minúscula.`
    } 
    else if (!/[0-9]/.test(trimmed_password)) {
        error = `La contraseña debe contener al menos un número.`
    }
    // No puede contener espacios
    else if (/\s/.test(trimmed_password)) {
        error = `La contraseña no puede contener espacios.`
    }
    else if (trimmed_password.length > PASSWORD_VALIDATION_CONSTANTS.maxLength) {
        error = `La contraseña debe tener menos de ${PASSWORD_VALIDATION_CONSTANTS.maxLength} caracteres.`
    } 
    /* Verifico que las contraseñas sean iguales, si es que se necesita. */
    else if (confirmPassword && password !== confirmPassword) {
        error = 'Las contraseñas no coinciden'
    }
    /* TODO: agregar caracteres espaciales, considerando al _ como tal */

    // Si no hay errores
    return error || null
}