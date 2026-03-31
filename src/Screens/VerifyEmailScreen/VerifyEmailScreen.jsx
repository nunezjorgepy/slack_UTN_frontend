import './VerifyEmailScreen.css'
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import HeaderComponent from '../../components/layout/HeaderComponent/HeaderComponent'
import useRequest from '../../hooks/useRequest'
import authService from '../../services/authService'
import ButtonComponent from '../../components/ui/ButtonComponent/ButtonComponent'

function VerifyEmailScreen() {
    document.title = 'SLACK UTN - Verificar correo'
    const [searchParams] = useSearchParams()
    const verify_email_token = searchParams.get('verify_email_token')
    const { sendRequest, response, error, loading } = useRequest()
    const navigate = useNavigate()

    // Función que busca el token en la API, usando useRequest

    const verifyEmail = () => {
        sendRequest({
            requestCb: () => {
                return authService.verifyEmail({ verify_email_token })
            }
        })
    }

    useEffect(() => {
        verifyEmail()
    }, [])

    return (
        <div>
            <HeaderComponent />
            <main>
                <section className='verify-email-section'>
                    {loading && <p>Verificando...</p>}
                    <h2>{response?.message}</h2>
                    <h2>{error?.message}</h2>

                    <ButtonComponent
                        text="Ingresar"
                        onClick={() => navigate('/login')}
                    />
                </section>
            </main>
        </div>
    )
}

export default VerifyEmailScreen