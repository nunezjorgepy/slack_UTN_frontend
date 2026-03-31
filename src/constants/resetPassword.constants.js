// Hubiera sido mejor llamarla resetPasswordForm y a dicho archivo resetPasswordRequestForm, pero bue...

import { LINKS_TO_OWN_SCREENS } from "./general.constants"

export const RESET_PASSWORD_CONSTANTS = {
    form_title: "Restablecer contraseña",
    form_subtitle: "Ingresa tu nueva contraseña",
    sections: [
        {
            inputs: [
                {
                    id: "password",
                    name: "password",
                    label: "Contraseña",
                    placeholder: "Ingresa tu contraseña",
                    required: true,
                    type: "password",
                    flex: "flex-100",
                    required: true
                },
                {
                    id: "confirmPassword",
                    name: "confirmPassword",
                    label: "Confirmar contraseña",
                    placeholder: "Confirma tu contraseña",
                    required: true,
                    type: "password",
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
            text: "¿Te acordaste la contraseña?",
            link: LINKS_TO_OWN_SCREENS.login,
            link_text: "Iniciá sesión"
        }
    ]
}   

export const initialFormState = {
    [RESET_PASSWORD_CONSTANTS.sections[0].inputs[0].name]: "",
    [RESET_PASSWORD_CONSTANTS.sections[0].inputs[1].name]: ""
}

export const SUCCES_INFO = {
    title: "Contraseña cambiada con éxito",
    body: "Ya puedes iniciar sesión con tu nueva contraseña",
    footer: {
        text: "Si la página no te redirige automáticamente, haz clic en el enlace de abajo",
        link: LINKS_TO_OWN_SCREENS.login,
        link_text: "Iniciá sesión"
    }
}