import { MEMBER_ROLES } from "./role.constants"

export const INVITE_USER_FORM_CONSTANTS = {
    form_title: "Invitar usuario",
    form_subtitle: "Ingresa los datos para invitar un usuario",
    sections: [
        {
            inputs: [
                {
                    id: "email",
                    name: "email",
                    label: "Email",
                    placeholder: "Ingresa el email del usuario",
                    required: true,
                    type: "email",
                    flex: "flex-100",
                    requirements: [
                        `El email debe tener un formato válido de email: micorreo@dominio.com`
                    ]
                },
                {
                    id: "role",
                    name: "role",
                    label: "Rol",
                    placeholder: "Ingresa el rol del usuario",
                    required: true,
                    type: "select",
                    flex: "flex-100",
                    options: [
                        { value: MEMBER_ROLES.user, label: "Usuario" },
                        { value: MEMBER_ROLES.admin, label: "Administrador" }
                    ],
                    requirements: [
                        `El rol debe ser Usuario o Administrador`
                    ]
                }
            ]
        }
    ],
    button: {
        text: "Invitar usuario",
        type: "submit"
    }
}

export const initialFormState = {
    [INVITE_USER_FORM_CONSTANTS.sections[0].inputs[0].name]: "",
    [INVITE_USER_FORM_CONSTANTS.sections[0].inputs[1].name]: MEMBER_ROLES.user
}

export const SUCCES_INVITE_USER_INFO = {
    title: "¡Usuario invitado!",
    body: "Se ha enviado un email al usuario con la invitación."
}