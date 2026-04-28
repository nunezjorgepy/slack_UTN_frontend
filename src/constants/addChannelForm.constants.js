import { ADD_CHANNEL_CONSTANTS } from "../validations/createChannelValidations"

export const ADD_CHANNEL_FORM_CONSTANTS = {
    form_title: "Añadir canal",
    form_subtitle: "Ingresa los datos para añadir un canal",
    sections: [
        {
            inputs: [
                {
                    id: "name",
                    name: "name",
                    label: "Nombre",
                    placeholder: "Ingresa el nombre del canal",
                    required: true,
                    type: "text",
                    flex: "flex-100",
                    requirements: [
                        `El nombre debe tener entre ${ADD_CHANNEL_CONSTANTS.name_min_length} y ${ADD_CHANNEL_CONSTANTS.name_max_length} caracteres`,
                        "El nombre debe contener solo letras"
                    ]
                },
                {
                    id: "description",
                    name: "description",
                    label: "Descripción",
                    placeholder: "Ingresa la descripción del canal",
                    required: false,
                    type: "text",
                    flex: "flex-100",
                    requirements: [
                        `La descripción debe tener entre ${ADD_CHANNEL_CONSTANTS.description_min_length} y ${ADD_CHANNEL_CONSTANTS.description_max_length} caracteres`
                    ]
                }
            ]
        }
    ],
    button: {
        text: "Añadir canal",
        type: "submit"
    }
}

export const initialFormState = {
    [ADD_CHANNEL_FORM_CONSTANTS.sections[0].inputs[0].name]: "",
    [ADD_CHANNEL_FORM_CONSTANTS.sections[0].inputs[1].name]: ""
}

export const SUCCES_ADD_CHANNEL_INFO = {
    title: "¡Canal añadido correctamente!",
    body: "El canal ha sido añadido correctamente.",
    footer: {
        text: "Si la página no te redirige automáticamente, haz clic en el enlace de abajo",
        link: "/",
        link_text: "Inicio"
    }
}