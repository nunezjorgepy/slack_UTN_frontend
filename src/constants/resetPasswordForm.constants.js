import { LINKS_TO_OWN_SCREENS } from "./general.constants";

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
            link: LINKS_TO_OWN_SCREENS.login,
            link_text: "Iniciá sesión"
        }
    ]
}

export const initialFormState = {
    [RESET_PASSWORD_FORM_CONSTANTS.sections[0].inputs[0].name]: ""
}

export const SUCCES_RESET_PASSWORD_INFO = {
    title: "Se ha enviado un correo electrónico a tu dirección",
    body: "Serás redirigido a la página principal en un momento...",
    footer: {
        text: "Ir a la página principal",
        link: LINKS_TO_OWN_SCREENS.home,
        link_text: "Home"
    }
}