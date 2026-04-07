// Components
import HeaderComponent from '../../components/layout/HeaderComponent/HeaderComponent'
import InformationFormComponent from '../../components/ui/InformationFormComponent/InformationFormComponent'
import ShowSuccesComponent from '../../components/ui/ShowSuccesComponent/ShowSuccesComponent'

// Constants
import { CREATE_WORKSPACE_FORM_CONSTANTS, SUCCES_CREATE_WORKSPACE_INFO, initialFormState } from '../../constants/createWorkspace.constants'

// Hooks
import { useContext, useState } from 'react'
import useRequest from '../../hooks/useRequest'

// Context
import { AuthContext } from '../../context/authContext'
import workspaceService from '../../services/workspaceService'

function CreateWorkspaceScreen() {
    // Cambia el título de la página
    document.title = 'Slack UTN - Crear Espacio de Trabajo'

    const { form_title, form_subtitle, sections, button, footer } = CREATE_WORKSPACE_FORM_CONSTANTS
    const { sendRequest, response, error, loading } = useRequest()
    const { manageLogin, isLogged } = useContext(AuthContext)
    const [errorMessage, setErrorMessage] = useState('')

    const onCreateWorkspace = (formState) => {
        
        // Validaciones
        setErrorMessage('')

        if (!formState.title) {
            setErrorMessage('El título del espacio de trabajo es requerido')
            return
        }
        if (formState.title.length < 10) {
            setErrorMessage('El título del espacio de trabajo debe tener al menos 10 caracteres')
            return
        }
        if (formState.title.length > 50) {
            setErrorMessage('El título del espacio de trabajo debe tener menos de 50 caracteres')
            return
        }

        if (formState.description && formState.description.length < 10) {
            setErrorMessage('La descripción del espacio de trabajo debe tener al menos 10 caracteres')
            return
        }
        if (formState.description && formState.description.length > 100) {
            setErrorMessage('La descripción del espacio de trabajo debe tener menos de 100 caracteres')
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

    return (
        <>
            <HeaderComponent />
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

                {/* {
                    response &&
                    <section className='show-succes-section'>
                        <ShowSuccesComponent data={SUCCES_LOGIN_INFO} />
                    </section>
                } */}
            </main>
        </>
    )
}

export default CreateWorkspaceScreen