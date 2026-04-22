import './RegisterScreen.css'
// Components
import InformationFormComponent from '../../components/ui/InformationFormComponent/InformationFormComponent'
import ShowSuccesComponent from '../../components/ui/ShowSuccesComponent/ShowSuccesComponent'
// Constants
import { REGISTER_FORM_CONSTANTS, SUCCES_REGISTER_INFO, initialFormState } from '../../constants/registerForm.constants'
import { LINKS_TO_OWN_SCREENS } from '../../constants/general.constants'
// Hooks
import useRequest from '../../hooks/useRequest'
// Services
import authService from '../../services/authService'
// Context
import { AuthContext } from '../../context/authContext'
// React
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { passwordValidation } from '../../validations/shared/password.validation'
import { registerValidation } from '../../validations/registerValidations'

function RegisterScreen() {
  document.title = 'Slack UTN - Registrate'

  const [errorMessage, setErrorMessage] = useState('')
  const { isLogged } = useContext(AuthContext)
  const navigate = useNavigate()

  const { 
    form_title, 
    form_subtitle, 
    sections, 
    button, 
    footer 
  } = REGISTER_FORM_CONSTANTS
  // Cambia el título de la página

  const { sendRequest, response, error, loading } = useRequest()

  const onRegister = (formState) => {
    setErrorMessage('')

    let register_validation = registerValidation(formState.name, formState.email, formState.password, formState.confirmPassword)
    if (register_validation) {
      setErrorMessage(register_validation)
      return
    }

    try {
      sendRequest({
        requestCb: () => {
          return authService.register(formState)
        }
      })
    } catch (error) {
      console.log(error)
    }
  }

  // Si el usuario ya esta logueado, no lo dejo entrar al login
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
      if (response?.status === 201) {
        setTimeout(() => {
          navigate(LINKS_TO_OWN_SCREENS.login)
        }, 3000)
      }
    },
    [response]
  )

  return (
    <>
      <main className='form-screens-main'>
        <section className='register-section'>
          <InformationFormComponent 
            form_title={form_title}
            form_subtitle={form_subtitle}
            sections={sections}
            button={button}
            footer={footer}
            initialFormState={initialFormState}
            onSubmitFunction={onRegister}
            errorMessage={errorMessage}
            error={error}
            loading={loading}
            response={response}
          />
        </section>

        {
          response &&
          <section className='show-succes-section'>
            <ShowSuccesComponent data={{
              ...SUCCES_REGISTER_INFO,
              footer: {
                ...SUCCES_REGISTER_INFO.footer,
                onClick: () => navigate(LINKS_TO_OWN_SCREENS.login)
              }
            }} />
          </section>
        }
      </main>
    </>
  )
}

export default RegisterScreen