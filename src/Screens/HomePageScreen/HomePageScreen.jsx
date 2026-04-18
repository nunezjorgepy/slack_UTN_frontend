import './HomePageScreen.css'
// Import Components
import FooterComponent from "../../components/layout/FooterComponent/FooterComponent"
import { Link } from 'react-router'
import WorkspacePreviewComponent from '../../components/ui/WorkspacePreviewComponent/WorkspacePreviewComponent'
import { LINKS_TO_OWN_SCREENS } from '../../constants/general.constants'
import useWorkspaces from '../../hooks/useWorkspaces'
import workspaceService from '../../services/workspaceService'
import CardComponent from '../../components/ui/CardComponent/CardComponent'

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

                                {/* 
                                ==================================
                                Tarjetas
                                ==================================
                                */}
                                <div className="workspaces-sidebar">
                                    <div className="down-with-the-cards">
                                        {/* Sirve para bajar las tarjetas así quedan a la altura de los espacios de trabajo */}
                                    </div>
                                    <CardComponent 
                                        card_title={'Tu plan Pro de Slack'}
                                        card_p={'Ve lo que incluye tu plan'}
                                        card_link_text={'Más información'}
                                        card_link_to={'/'}
                                    />
                                    <CardComponent 
                                        card_title={'Comenzar con tu plantilla.'}
                                        card_p={'Pon en marcha proyectos con un solo clic.'}
                                        card_link_text={'Exploar plantilla'}
                                        card_link_to={'/'}
                                        card_image={'https://a.slack-edge.com/02ee189/marketing/img/homepage/signed-in-users/card-assets/Templates-small@2x.png'}
                                        card_alt={'Imagen de plantillas'}
                                    />
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