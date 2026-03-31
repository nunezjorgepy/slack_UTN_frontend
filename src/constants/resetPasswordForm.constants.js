/* Constantes para el reseteo de contraseña */

export const RESET_PASSWORD_FORM_CONSTANTS = {
    form_title: "Restablecer contraseña",
    form_subtitle: "Ingresa tu email para restablecer tu contraseña",
    sections: [
        {
            inputs: [
                {
                    id: "email",
                    name: "email",
                    label: "Email",
                    placeholder: "Ingresa tu email",
                    required: true,
                    type: "text",
                    flex: "flex-100",
                    required: true
                }
            ]
        }
    ],
    button: {
        text: "Restablecer contraseña",
        type: "submit"
    },
    footer: [
        {
            text: "¿Ya tenés una cuenta?",
            link: "/login",
            link_text: "Iniciá sesión"
        }
    ]
}

export const initialFormState = {
    [RESET_PASSWORD_FORM_CONSTANTS.sections[0].inputs[0].name]: ""
}