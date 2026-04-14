

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
                        { value: "admin", label: "Admin" },
                        { value: "user", label: "User" }
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
    [INVITE_USER_FORM_CONSTANTS.sections[0].inputs[1].name]: ""
}

export const SUCCES_INVITE_USER_INFO = {
    title: "¡Usuario invitado correctamente!",
    body: "El usuario ha sido invitado correctamente."
}