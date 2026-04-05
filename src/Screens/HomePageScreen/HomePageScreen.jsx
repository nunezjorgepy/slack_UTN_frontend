import './HomePageScreen.css'

// Import Components
import HeaderComponent from "../../components/layout/HeaderComponent/HeaderComponent"
import FooterComponent from "../../components/layout/FooterComponent/FooterComponent"
import useWorkspaces from '../../hooks/useWorkspaces'
import { Link } from 'react-router'

function HomePageScreen() {
    // Cambia el título de la página
    document.title = 'Slack UTN - Home'

    const { workspaces } = useWorkspaces()

    return (
        <>
            <HeaderComponent />
            <main>
                <section className='hp-hero o-hero'>
                    <div className="hp-workspaces">
                        {/* Título de bienvenida */}
                        <div className="hp-sign-in-hero">
                            Hola de nuevo!
                        </div>

                        {/* Primera sección */}
                        <div className="hp-sign-in-conainer">
                            <div className="workspaces-container">
                                <div className="my-workspaces">
                                    {/* Título de la sección */}
                                    <span className="section-title">
                                        Mis espacios de trabajo
                                    </span>

                                    {/* Contenedor de los espacios de trabajo */}
                                    <div className="workspaces-list">
                                        {/* Tabs */}
                                        <div className="workspaces-tabs">
                                            <button 
                                                type="radio" 
                                                name="workspaces-tabs-button" 
                                                id="workspaces-tabs-button" 
                                                className='workspaces-tabs-button active'
                                                checked
                                            >
                                                Espacios de trabajo
                                            </button>
                                        </div>

                                        {/* Contenedor de los workspaces */}
                                        <div className="workspaces-list-content">
                                            <div className="authenticated-workspaces-container" id='workspaces-container'>
                                                <span className="ready-to-launch">
                                                    Listo para iniciar
                                                </span>
                                                {/* Desde acá arranca el componente a crear */}
                                                {/* Falta crear la página del link */}
                                                <Link to={`/`} className='workspace-preview-container'>
                                                    <div className="workspace-list-container">
                                                        <img src={"https://a.slack-edge.com/80588/img/avatars-teams/ava_0026-88.png"} alt="Imagen del espacio de trabajo" />
                                                        <div className="workspace-details">
                                                            <div className="workspaces-name">
                                                                Trabajo Final UTN
                                                            </div>
                                                            <div className="workspace-members">
                                                                <span className="workspace-members-count">
                                                                    10 miembros
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="workspace-list-item-button">
                                                        <span className="workspace-list-item-button-text">
                                                            Iniciar
                                                        </span>
                                                        <svg className="workspace-list-item-button-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M9 18L15 12L9 6" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                                        </svg>
                                                    </div>
                                                </Link>
                                                {/* Acá termina el componente */}
                                            </div>
                                        </div>

                                        {/* Footer de los espacios de trabajo */}
                                        <div className="workspaces-footer">
                                            {/* TODO: crear la página para crear espacios de trabajo */}
                                            <Link>
                                                Crear un espacio de trabajo
                                            </Link>
                                            <span className="workspaces-footer-tab">
                                                ¿No encuentras tu espacio de trabajo? {'\u00A0'}
                                                <Link>
                                                    Prueba con otro correo electrónico
                                                </Link>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="workspaces-sidebar">
                                    Completar con Trajetas
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <FooterComponent />
        </>
    )
}

export default HomePageScreen