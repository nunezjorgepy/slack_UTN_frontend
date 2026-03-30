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
import { useContext, useEffect } from 'react'
import { AuthContext } from '../../context/authContext'

function RegisterScreen() {
  document.title = 'Slack UTN - Registrate'

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
          />
        </section>
      </main>
    </>
  )
}

export default RegisterScreen