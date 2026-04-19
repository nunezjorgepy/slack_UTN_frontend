import './LogInScreen.css'
import InformationFormComponent from '../../components/ui/InformationFormComponent/InformationFormComponent'
import ShowSuccesComponent from '../../components/ui/ShowSuccesComponent/ShowSuccesComponent'

import { LOG_IN_FORM_CONSTANTS, SUCCES_LOGIN_INFO, initialFormState } from '../../constants/logInForm.constants'

import useRequest from '../../hooks/useRequest'
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'

import authService from '../../services/authService'
import { AuthContext } from '../../context/authContext'
import { passwordValidation } from '../../validations/shared/password.validation'
import { emailValidation } from '../../validations/shared/email.validation'
import { loginValidation } from '../../validations/loginValidations'

function LogInScreen() {
    const { form_title, form_subtitle, sections, button, footer } = LOG_IN_FORM_CONSTANTS
    // Cambia el título de la página
    document.title = 'Slack UTN - Inicia Sesión'

    // Según el profe, todo esto debería ir en un hook separado (algo así como useLogIn) y este componente solo se encargaría de la UI
    const { sendRequest, response, error, loading } = useRequest()
    const { manageLogin, isLogged } = useContext(AuthContext)
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    const onLogIn = (formState) => {
        // Validar que formState tenga todos los campos requeridos
        setErrorMessage('')

        // Valido que el email y la contraseña sean validos
        let login_validation = loginValidation(formState.email, formState.password)
        if (login_validation) {
            setErrorMessage(login_validation)
            return
        }

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
                setTimeout(() => {
                    manageLogin(response.data.auth_token)
                }, 3000)
            }
        }, 
        [response]
    )

    return (
        <>
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
                        errorMessage={errorMessage}
                        error={error}
                        loading={loading}
                    />
                </section>

                {
                    response &&
                    <section className='show-succes-section'>
                        <ShowSuccesComponent data={{
                            ...SUCCES_LOGIN_INFO,
                            footer: {
                                ...SUCCES_LOGIN_INFO.footer,
                                onClick: () => manageLogin(response.data.auth_token)
                            }
                        }} />
                    </section>
                }
            </main>
        </>
    )
}

export default LogInScreen