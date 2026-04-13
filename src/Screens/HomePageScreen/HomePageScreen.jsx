import './HomePageScreen.css'

// Import Components
import HeaderComponent from "../../components/layout/HeaderComponent/HeaderComponent"
import FooterComponent from "../../components/layout/FooterComponent/FooterComponent"
import { Link } from 'react-router'
import WorkspacePreviewComponent from '../../components/ui/WorkspacePreviewComponent/WorkspacePreviewComponent'
import { LINKS_TO_OWN_SCREENS } from '../../constants/general.constants'
import useWorkspaces from '../../hooks/useWorkspaces'
import workspaceService from '../../services/workspaceService'

function HomePageScreen() {
    // Cambia el título de la página
    document.title = 'Slack UTN - Home'

    const { workspaces, response, loading, error } = useWorkspaces(
        {
            callbackFunction: workspaceService.getActiveWorkspaces
        }
    )

    const renderWorkspaces = () => {
        if (loading) {
            return <div>Cargando...</div>
        }
        if (error) {
            return <div>Error al cargar los espacios de trabajo</div>
        }
        if (!workspaces) {
            return <div>No se encontraron espacios de trabajo. Hace click en "Crear un espacio de trabajo" para crear uno.</div>
        }
        return workspaces.map((workspace) => (
            <div key={workspace.member_workspace_id}>
                <WorkspacePreviewComponent workspace={workspace} />
            </div>
        ))
    }

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
                                                {renderWorkspaces()}
                                                {/* Acá termina el componente */}
                                            </div>
                                        </div>

                                        {/* Footer de los espacios de trabajo */}
                                        <div className="workspaces-footer">
                                            {/* TODO: crear la página para crear espacios de trabajo */}
                                            <Link to={LINKS_TO_OWN_SCREENS.create_workspace}>
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