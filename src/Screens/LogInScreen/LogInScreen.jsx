import './LogInScreen.css'
import HeaderComponent from '../../components/layout/HeaderComponent/HeaderComponent'
import InformationFormComponent from '../../components/ui/InformationFormComponent/InformationFormComponent'
import { LOG_IN_FORM_CONSTANTS, initialFormState } from '../../constants/logInForm.constants'
import authService from '../../services/authService'
import useRequest from '../../hooks/useRequest'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { AuthContext } from '../../context/authContext'

function LogInScreen() {
    const { form_title, form_subtitle, sections, button, footer } = LOG_IN_FORM_CONSTANTS
    // Cambia el título de la página
    document.title = 'Slack UTN - Inicia Sesión'

    // Según el profe, todo esto debería ir en un hook separado (algo así como useLogIn) y este componente solo se encargaría de la UI
    const { sendRequest, response, error, loading } = useRequest()
    const { manageLogin, isLogged } = useContext(AuthContext)
    const navigate = useNavigate()

    const onLogIn = (formState) => {
        try {
            sendRequest({
                requestCb: () => {
                    return authService.login(formState)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    // Si el usuario ya esta logueado, no lo dejo entrar al login
    // Probablemente esto sería mejor con un middleware
    // TODO: si conviene el middleware, implementarlo
    useEffect(
        () => {
            if (isLogged) {
                navigate('/')
            }
        },
        [isLogged]
    )

    // Hook para manejar la respuesta del servidor
    useEffect(
        () => {
            if (response && response.status === 200) {
                manageLogin(response.data.login_token)
            }
        }, 
        [response]
    )

    return (
        <>
            <HeaderComponent />
            <main>
                <section className='login-section'>
                    <InformationFormComponent
                        form_title={form_title}
                        form_subtitle={form_subtitle}
                        sections={sections}
                        button={button}
                        footer={footer}
                        initialFormState={initialFormState}
                        onSubmitFunction={onLogIn}
                    />
                </section>
            </main>
        </>
    )
}

export default LogInScreen