/* 
    Constantes para el form de login
*/

export const LOG_IN_FORM_CONSTANTS = {
    form_title: "Inicia sesión",
    form_subtitle: "Ingresa tus datos para iniciar sesión",
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
                },
                {
                    id: "password",
                    name: "password",
                    label: "Contraseña",
                    placeholder: "Ingresa tu contraseña",
                    required: true,
                    type: "password",
                    flex: "flex-100",
                    required: true
                }
            ]
        }
    ],
    button: {
        text: "Iniciar sesión",
        type: "submit"
    },
    footer: [
        {
            text: "¿No tenés una cuenta?",
            link: "/register",
            link_text: "Registrate"
        },
        {
            text: "¿Olvidaste tu contraseña?",
            link: "/reset-password",
            link_text: "Restablecé tu contraseña"
        }
    ]
}

// initialFormState
export const initialFormState = {
    [LOG_IN_FORM_CONSTANTS.sections[0].inputs[0].name]: "",
    [LOG_IN_FORM_CONSTANTS.sections[0].inputs[1].name]: ""
}