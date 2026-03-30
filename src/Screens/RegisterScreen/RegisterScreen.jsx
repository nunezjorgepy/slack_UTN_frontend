import './RegisterScreen.css'

// Components
import HeaderComponent from '../../components/layout/HeaderComponent/HeaderComponent'
import InformationFormComponent from '../../components/ui/InformationFormComponent/InformationFormComponent'

// Constants
import { REGISTER_FORM_CONSTANTS, initialFormState } from '../../constants/registerForm.constants'
import ButtonComponent from '../../components/ui/ButtonComponent/ButtonComponent'
import { Link, useNavigate } from 'react-router'
import useRequest from '../../hooks/useRequest'
import authService from '../../services/authService'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/authContext'

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
        // TODO: modificar para que aparezca un cartel en vez de un alert
        alert('Usuario registrado exitosamente')
        navigate('/login')
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
      </main>
    </>
  )
}

export default RegisterScreen