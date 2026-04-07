

export const CREATE_WORKSPACE_FORM_CONSTANTS = {
    form_title: "Crear un espacio de trabajo",
    form_subtitle: "Ingresa los datos de tu espacio de trabajo",
    sections: [
        {
            inputs: [
                {
                    id: "workspace_title",
                    name: "workspace_title",
                    label: "Nombre del espacio de trabajo",
                    placeholder: "Ingresa el nombre de tu espacio de trabajo",
                    required: true,
                    type: "text",
                    flex: "flex-50",
                    required: true
                },
                {
                    id: "workspace_description",
                    name: "workspace_description",
                    label: "Descripción del espacio de trabajo",
                    placeholder: "Ingresa la descripción de tu espacio de trabajo",
                    required: true,
                    type: "text",
                    flex: "flex-50",
                    required: true
                },
                {
                    id: "workspace_url_image",
                    name: "workspace_url_image",
                    label: "URL de la imagen del espacio de trabajo",
                    placeholder: "Ingresa la URL de la imagen de tu espacio de trabajo",
                    type: "text",
                    flex: "flex-100",
                    required: true
                }
            ]
        },
    ],
    button: {
        text: "Crear",
        type: "submit"
    }
}

export const initialFormState = {
    [CREATE_WORKSPACE_FORM_CONSTANTS.sections[0].inputs[0].name]: "",
    [CREATE_WORKSPACE_FORM_CONSTANTS.sections[0].inputs[1].name]: ""
}

export const SUCCES_CREATE_WORKSPACE_INFO = {
    title: "Espacio de trabajo creado exitosamente",
    body: "Serás redirigido a la pantalla de espacios de trabajo en unos segundos.",
    footer: {
        text: "Si la página no te redirige automáticamente, haz clic en el enlace de abajo",
        link: "/",
        link_text: "Ir al inicio"
    }
}