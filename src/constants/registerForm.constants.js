import { NAME_VALIDATION_CONSTANTS } from "../validations/registerValidations";
import { PASSWORD_VALIDATION_CONSTANTS } from "../validations/shared/password.validation";
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
                    requirements: [
                        `Debe tener entre ${NAME_VALIDATION_CONSTANTS.name_min_length} y ${NAME_VALIDATION_CONSTANTS.name_max_length} caracteres`,
                        `Debe contener al menos una letra mayúscula`,
                        `Debe contener al menos una letra minúscula`,
                        `No debe contener espacios`
                    ]
                },
                {
                    id: "email",
                    name: "email",
                    label: "Email",
                    placeholder: "Ingresa tu email",
                    required: true,
                    type: "email",
                    flex: "flex-50",
                    requirements: [
                        `El email debe tener un formato válido de email: micorreo@dominio.com`
                    ]
                },
                {
                    id: "password",
                    name: "password",
                    label: "Contraseña",
                    placeholder: "Ingresa tu contraseña",
                    required: true,
                    type: "password",
                    flex: "flex-50",
                    requirements: [
                        `Debe tener entre ${PASSWORD_VALIDATION_CONSTANTS.password_min_length} y ${PASSWORD_VALIDATION_CONSTANTS.password_max_length} caracteres`,
                        `Debe contener al menos una letra mayúscula`,
                        `Debe contener al menos una letra minúscula`,
                        `Debe contener al menos un número`,
                        `No debe contener espacios`
                    ]
                },
                {
                    id: "confirmPassword",
                    name: "confirmPassword",
                    label: "Confirmar contraseña",
                    placeholder: "Confirma tu contraseña",
                    required: true,
                    type: "password",
                    flex: "flex-50",
                    requirements: [
                        `La confirmación debe coincidir con la contraseña`
                    ]
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

export const SUCCES_REGISTER_INFO = {
    title: "¡Usuario registrado exitosamente!",
    body: "Serás redirigido a la pantalla de login en unos segundos.",
    footer: {
        text: "Si la página no te redirige automáticamente, haz clic en el enlace de abajo",
        link: LINKS_TO_OWN_SCREENS.login,
        link_text: "Iniciar sesión"
    }
}