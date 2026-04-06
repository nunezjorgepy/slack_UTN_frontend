import { useParams } from 'react-router'
import './WorkspaceScreen.css'

function WorkspaceScreen() {
    const { workspaceId } = useParams()

    // Cambia el título de la página
    document.title = 'Slack UTN - Workspace'

    return (
        <div>WorkspaceScreen</div>
    )
}

export default WorkspaceScreen