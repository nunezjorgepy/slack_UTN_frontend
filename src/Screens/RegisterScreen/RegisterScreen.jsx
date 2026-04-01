import './RegisterScreen.css'

// Components
import HeaderComponent from '../../components/layout/HeaderComponent/HeaderComponent'
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
    // TODO: Debería crear un sistema de manejo de erorres, pero por ahora lo dejo acá.
    // Las validaciones conviene hacerlas acá para evitar que el usuario tenga que esperar la respuesta del servidor.

    // Validar que formState tenga todos los campos requeridos
    setErrorMessage('')

    const requiredFields = [
      'name',
      'email',
      'password',
      'confirmPassword'
    ]

    const missingFields = requiredFields.filter(field => !formState[field])

    if (missingFields.length > 0) {
      setErrorMessage('Faltan campos obligatorios')
      return
    }

    // Validar que email sea un email válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formState.email)) {
      setErrorMessage('El email no es válido')
      return
    }

    // Validar que password tenga al menos 8 caracteres
    if (formState.password.trim().length < 8) {
      setErrorMessage('La contraseña debe tener al menos 8 caracteres')
      return
    }

    // Validar que password y confirmPassword sean iguales
    if (formState.password !== formState.confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden')
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
      <HeaderComponent />
      <main>
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
          />
        </section>

        {
          response &&
          <section className='show-succes-section'>
            <ShowSuccesComponent data={SUCCES_REGISTER_INFO} />
          </section>
        }
      </main>
    </>
  )
}

export default RegisterScreen