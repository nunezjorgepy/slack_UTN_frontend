

export const emailValidation = (email) => {
    let error = '';
    const trimmed_lower_email = email.trim().toLowerCase();

    if (!trimmed_lower_email) {
        error =  'El email es requerido'
    }
    // Verificar que sea un email válido
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed_lower_email)) {
        error = 'El email no es valido'
    }

    return error || null
}