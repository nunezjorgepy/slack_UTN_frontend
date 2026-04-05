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
                        <div className="hp-sign-in-container">
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
                                                {/* TODO: Falta crear la página del link */}
                                                <Link to={`/`} className='workspace-list-item'>
                                                    <div className="workspace-list-content">
                                                        <img className='workspace-icon' src={"https://a.slack-edge.com/80588/img/avatars-teams/ava_0026-88.png"} alt="Imagen del espacio de trabajo" />
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
                                                        <div className="workspace-list-item-button">
                                                            <span className="workspace-list-item-button-text">
                                                                Iniciar
                                                            </span>
                                                            <svg className="workspace-list-item-button-icon" width="24" height="24" viewBox="0 0 12 14" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M6 0C6.41421 0 6.75 0.335786 6.75 0.75V11.377L10.707 7.23242C10.9929 6.93292 11.4679 6.92139 11.7676 7.20703C12.0671 7.49292 12.0786 7.96793 11.793 8.26758L6.54297 13.7676C6.40145 13.9158 6.20496 14 6 14C5.79504 14 5.59855 13.9158 5.45703 13.7676L0.207031 8.26758C-0.0786086 7.96793 -0.0670771 7.49292 0.232422 7.20703C0.532066 6.92139 1.00708 6.93292 1.29297 7.23242L5.25 11.377V0.75C5.25 0.335787 5.58579 7.73111e-07 6 0Z"></path>
                                                            </svg>
                                                        </div>
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