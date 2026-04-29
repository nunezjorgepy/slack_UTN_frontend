import './ResetPasswordScreen.css'
import InformationFormComponent from '../../components/ui/InformationFormComponent/InformationFormComponent'
import ShowSuccesComponent from '../../components/ui/ShowSuccesComponent/ShowSuccesComponent'
import { RESET_PASSWORD_CONSTANTS, SUCCES_INFO, initialFormState } from '../../constants/resetPassword.constants'
import useRequest from '../../hooks/useRequest'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import authService from '../../services/authService'
import { useContext } from 'react'
import { AuthContext } from '../../context/authContext'
import { changePasswordValidations } from '../../validations/changePasswordValidations'

function ResetPasswordScreen() {
    const { reset_password_token } = useParams()
    const { form_title, form_subtitle, sections, button, footer } = RESET_PASSWORD_CONSTANTS
    const { sendRequest, response, error, loading } = useRequest()
    const { manageResetPassword } = useContext(AuthContext)
    const [errorMessage, setErrorMessage] = useState('')
    const { isLogged } = useContext(AuthContext)
    const navigate = useNavigate()

    if (!reset_password_token) {
        return (
            <>
                <HeaderComponent />
                <main className='form-screens-main'>
                    <p>Token no proporcionado</p>
                </main>
            </>
        )
    }

    const onResetPassword = (formState) => {
        // Seteo el mensaje de error en null
        setErrorMessage('')
        
        let password_validation = changePasswordValidations(formState.password, formState.confirmPassword)
        if (password_validation) {
            setErrorMessage(password_validation)
            return
        }

        sendRequest({
            requestCb: () => {
                return authService.resetPassword({
                    reset_password_token,
                    password: formState.password,
                    confirmPassword: formState.confirmPassword
                })
            }
        })
    }

    useEffect(() => {
        if (isLogged) {
            navigate('/')
        }
    }, [isLogged])

    useEffect(() => {
        if (response) {
            setTimeout(() => {
                manageResetPassword()
            }, 3000)
        }
    }, [response])

    return (
        <>
            <main className='form-screens-main'>
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
                        response={response}
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