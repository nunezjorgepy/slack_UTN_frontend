import './ResetPasswordScreen.css'
import HeaderComponent from '../../components/layout/HeaderComponent/HeaderComponent'
import InformationFormComponent from '../../components/ui/InformationFormComponent/InformationFormComponent'
import ShowSuccesComponent from '../../components/ui/ShowSuccesComponent/ShowSuccesComponent'
import { RESET_PASSWORD_CONSTANTS, SUCCES_INFO, initialFormState } from '../../constants/resetPassword.constants'
import useRequest from '../../hooks/useRequest'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import authService from '../../services/authService'
import { useContext } from 'react'
import { AuthContext } from '../../context/authContext'

function ResetPasswordScreen() {
    const { reset_password_token } = useParams()
    const { form_title, form_subtitle, sections, button, footer } = RESET_PASSWORD_CONSTANTS
    const { sendRequest, response, error, loading } = useRequest()
    const { manageResetPassword } = useContext(AuthContext)
    const [errorMessage, setErrorMessage] = useState('')

    if (!reset_password_token) {
        return (
            <>
                <HeaderComponent />
                <main>
                    <p>Token no proporcionado</p>
                </main>
            </>
        )
    }

    const onResetPassword = (formState) => {
        // Seteo el mensaje de error en null
        setErrorMessage('')
        // Verificar que no falten campos
        const requiredFields = [
            'password',
            'confirmPassword'
        ]
        const missingFields = requiredFields.filter(field => !formState[field].trim())
        if (missingFields.length > 0) {
            setErrorMessage('Faltan campos obligatorios')
            return
        }

        // Verificar que las contraseñas sean iguales
        if (formState.password.trim() !== formState.confirmPassword.trim()) {
            setErrorMessage('Las contraseñas no coinciden')
            return
        }

        // Verificar que la contraseña tenga al menos 8 caracteres
        if (formState.password.trim().length < 8) {
            setErrorMessage('La contraseña debe tener al menos 8 caracteres')
            return
        }

        // Y menos de 16
        if (formState.password.trim().length > 16) {
            setErrorMessage('La contraseña debe tener menos de 16 caracteres')
            return
        }

        try {
            sendRequest({
                requestCb: () => {
                    return authService.resetPassword({
                        reset_password_token,
                        password: formState.password,
                        confirmPassword: formState.confirmPassword
                    })
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (response) {
            setTimeout(() => {
                manageResetPassword()
            }, 3000)
        }
    }, [response])

    return (
        <>
            <HeaderComponent />
            <main>
                <section className='reset-password-section'>
                    <InformationFormComponent
                        form_title={form_title}
                        form_subtitle={form_subtitle}
                        sections={sections}
                        button={button}
                        footer={footer}
                        initialFormState={initialFormState}
                        onSubmitFunction={onResetPassword}
                        errorMessage={errorMessage}
                        error={error}
                        loading={loading}
                    />
                </section>
                {response &&
                    <section className='show-succes-section'>
                        {<ShowSuccesComponent data={{
                            ...SUCCES_INFO,
                            footer: {
                                ...SUCCES_INFO.footer,
                                onClick: () => manageResetPassword()
                            }
                        }} />}
                    </section>
                }
            </main>
        </>
    )
}

export default ResetPasswordScreen