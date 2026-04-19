// Components
import InformationFormComponent from '../../components/ui/InformationFormComponent/InformationFormComponent'
import ShowSuccesComponent from '../../components/ui/ShowSuccesComponent/ShowSuccesComponent'

// Constants
import { CREATE_WORKSPACE_FORM_CONSTANTS, SUCCES_CREATE_WORKSPACE_INFO, initialFormState } from '../../constants/createWorkspace.constants'

// Hooks
import { useContext, useEffect, useState } from 'react'
import useRequest from '../../hooks/useRequest'

// Context
import { AuthContext } from '../../context/authContext'
import workspaceService from '../../services/workspaceService'
import { useNavigate } from 'react-router'
import { createWorkspaceValidations } from '../../validations/createWorkspaceValidations'

function CreateWorkspaceScreen() {
    // Cambia el título de la página
    document.title = 'Slack UTN - Crear Espacio de Trabajo'

    const { form_title, form_subtitle, sections, button, footer } = CREATE_WORKSPACE_FORM_CONSTANTS
    const { sendRequest, response, error, loading } = useRequest()
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    const onCreateWorkspace = (formState) => {
        // Validaciones
        setErrorMessage('')

        let create_workspace_validation = createWorkspaceValidations({
            title: formState.title.trim(),
            description: formState.description.trim(),
            url_image: formState.url_image.trim()
        })
        if (create_workspace_validation) {
            console.log(create_workspace_validation)
            setErrorMessage(create_workspace_validation)
            return
        }
        
        try {
            sendRequest({
                requestCb: () => {
                    return workspaceService.createWorkspace(formState)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(
        () => {
            if (response && response.status === 201) {
                setTimeout(() => {
                    navigate('/workspace/' + response?.data?.workspace?._id)
                }, 3000)
            }
        },
        [response]
    )
    return (
        <>
            <main>
                <section className='create-workspace-section'>
                    <InformationFormComponent
                        form_title={form_title}
                        form_subtitle={form_subtitle}
                        sections={sections}
                        button={button}
                        footer={footer}
                        initialFormState={initialFormState}
                        onSubmitFunction={onCreateWorkspace}
                        errorMessage={errorMessage}
                        error={error}
                        loading={loading}
                    />
                </section>

                {
                    response &&
                    <section className='show-succes-section'>
                        <ShowSuccesComponent data={{
                            ...SUCCES_CREATE_WORKSPACE_INFO,
                            footer: {
                                ...SUCCES_CREATE_WORKSPACE_INFO.footer,
                                link: `/workspace/${response?.data?.workspace?._id}`
                            }
                        }} />
                    </section>
                }
            </main>
        </>
    )
}

export default CreateWorkspaceScreen