import { LINKS_TO_OWN_SCREENS } from "./general.constants";

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
                    type: "email",
                    flex: "flex-100",
                },
                {
                    id: "password",
                    name: "password",
                    label: "Contraseña",
                    placeholder: "Ingresa tu contraseña",
                    required: true,
                    type: "password",
                    flex: "flex-100",
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
            link: LINKS_TO_OWN_SCREENS.register,
            link_text: "Registrate"
        },
        {
            text: "¿Olvidaste tu contraseña?",
            link: LINKS_TO_OWN_SCREENS.reset_password_request,
            link_text: "Restablecer"
        }
    ]
}

// initialFormState
export const initialFormState = {
    [LOG_IN_FORM_CONSTANTS.sections[0].inputs[0].name]: "",
    [LOG_IN_FORM_CONSTANTS.sections[0].inputs[1].name]: ""
}

export const SUCCES_LOGIN_INFO = {
    title: "¡Logueado correctamente!",
    body: "Serás redirigido a la pantalla principal en unos segundos.",
    footer: {
        text: "Si la página no te redirige automáticamente, haz clic en el enlace de abajo",
        link: "/",
        link_text: "Inicio"
    }
}