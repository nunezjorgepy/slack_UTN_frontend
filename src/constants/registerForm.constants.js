import { LINKS_TO_OWN_SCREENS } from "./general.constants";

export const REGISTER_FORM_CONSTANTS = {
    form_title: "Crea una cuenta",
    form_subtitle: "Ingresa tus datos para crear una cuenta y realizar pedidos",
    sections: [
        {
            section_title: "Información personal",
            section_number: "1",
            inputs: [
                {
                    id: "name",
                    name: "name",
                    label: "Nombre",
                    placeholder: "Ingresa tu nombre",
                    required: true,
                    type: "text",
                    flex: "flex-50",
                    required: true
                },
                {
                    id: "email",
                    name: "email",
                    label: "Email",
                    placeholder: "Ingresa tu email",
                    required: true,
                    type: "text",
                    flex: "flex-50",
                    required: true
                },
                {
                    id: "password",
                    name: "password",
                    label: "Contraseña",
                    placeholder: "Ingresa tu contraseña",
                    required: true,
                    type: "password",
                    flex: "flex-50",
                    required: true
                },
                {
                    id: "confirmPassword",
                    name: "confirmPassword",
                    label: "Confirmar contraseña",
                    placeholder: "Confirma tu contraseña",
                    required: true,
                    type: "password",
                    flex: "flex-50",
                    required: true
                }
            ]
        },
    ],
    button: {
        text: "Registrarse",
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
    [REGISTER_FORM_CONSTANTS.sections[0].inputs[0].name]: "",
    [REGISTER_FORM_CONSTANTS.sections[0].inputs[1].name]: "",
    [REGISTER_FORM_CONSTANTS.sections[0].inputs[2].name]: "",
    [REGISTER_FORM_CONSTANTS.sections[0].inputs[3].name]: ""
}