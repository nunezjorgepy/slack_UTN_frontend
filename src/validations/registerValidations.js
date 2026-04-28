export const NAME_VALIDATION_CONSTANTS = {
    name_min_length: 3,
    name_max_length: 50
}

import { emailValidation } from "./shared/email.validation"
import { passwordValidation } from "./shared/password.validation"

export const registerValidation = (name, email, password, confirmPassword) => {
    /**
     * Descripción: Valida que el email y la contraseña sean validos
     * @param {string} name - El email a validar
     * @param {string} email - La contraseña a validar
     * @param {string} password - La contraseña a validar
     * @param {string} confirmPassword - La contraseña a validar
     * @returns {string|null} - null si el email y la contraseña son validos, de lo contrario devuelve un mensaje de error
     */
    let name_error = ''
    let trimmed_lower_name = name.trim().toLowerCase()

    /* 
    Posibles errores para el nombre
    */
    // Si el nombre no existe, mostrar error
    if (!trimmed_lower_name) name_error = 'El nombre es requerido'
    // Si tiene más o menos de los caracteres permitidos, mostrar error
    else if (trimmed_lower_name.length < NAME_VALIDATION_CONSTANTS.name_min_length) name_error = `El nombre debe tener al menos ${NAME_VALIDATION_CONSTANTS.name_min_length} caracteres`
    else if (trimmed_lower_name.length > NAME_VALIDATION_CONSTANTS.name_max_length) name_error = `El nombre debe tener menos de ${NAME_VALIDATION_CONSTANTS.name_max_length} caracteres`

    let error = name_error || emailValidation(email) || passwordValidation(password, confirmPassword)

    return error || null
}
