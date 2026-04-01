import { useEffect } from 'react'
import './ResetPasswordRequestScreen.css'

import HeaderComponent from '../../components/layout/HeaderComponent/HeaderComponent'
import InformationFormComponent from '../../components/ui/InformationFormComponent/InformationFormComponent'
import ShowSuccesComponent from '../../components/ui/ShowSuccesComponent/ShowSuccesComponent'

import { RESET_PASSWORD_FORM_CONSTANTS, SUCCES_RESET_PASSWORD_INFO, initialFormState } from '../../constants/resetPasswordForm.constants'

import useRequest from '../../hooks/useRequest'
import { useState } from 'react'
import { useNavigate } from 'react-router'

import authService from '../../services/authService'

function ResetPasswordRequestScreen() {
    const { form_title, form_subtitle, sections, button, footer } = RESET_PASSWORD_FORM_CONSTANTS
    const { sendRequest, response, error, loading } = useRequest()
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate()

    const onResetPasswordRequest = (formState) => {
        // Seteo el mensaje de error en null
        setErrorMessage('')
        // Verificar que no falten campos
        const requiredFields = [
            'email'
        ]
        const missingFields = requiredFields.filter(field => !formState[field])
        if (missingFields.length > 0) {
            setErrorMessage('Faltan campos obligatorios')
            return
        }

        // Verificar que el mail sea válido
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formState.email)) {
            setErrorMessage('El email no es válido')
            return
        }

        try {
            sendRequest({
                requestCb: () => {
                    return authService.resetPasswordRequest(formState)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (response) {
            setTimeout(() => {
                navigate('/')
            }, 3000)
        }
    }, [response])

    return (
        <>
            <HeaderComponent />
            <main>
                <section className='reset-password-request-section'>
                    <InformationFormComponent
                        form_title={form_title}
                        form_subtitle={form_subtitle}
                        sections={sections}
                        button={button}
                        footer={footer}
                        initialFormState={initialFormState}
                        onSubmitFunction={onResetPasswordRequest}
                        errorMessage={errorMessage}
                        error={error}
                    />
                </section>

                {
                    response &&
                    <section className='show-succes-section'>
                        <ShowSuccesComponent data={SUCCES_RESET_PASSWORD_INFO} />
                    </section>
                }
            </main>
        </>
    )
}

export default ResetPasswordRequestScreen