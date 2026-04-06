import { useParams } from 'react-router'
import './WorkspaceScreen.css'
import memberWorkspaceService from '../../services/memberWorkspaceSerivce'
import useMemberWorkspaces from '../../hooks/useMemberWorkspaces'

function WorkspaceScreen() {
    const { workspaceId } = useParams()

    const { members, response, loading, error } = useMemberWorkspaces(
        {
            callbackFunction: () => memberWorkspaceService.getMemberListByWorkspaceId(workspaceId),
        }
    )
    
    console.log(members)

    const renderMembers = () => {
        if (loading) {
            return <div>Cargando...</div>
        }
        if (error) {
            return <div>Error al cargar los miembros</div>
        }
        if (!members) {
            return <div>No se encontraron miembros</div>
        }
        return members.map((member) => (
            <div key={member.member_id}>
                {member.user_email}
            </div>
        ))
    }

    // Cambia el título de la página
    document.title = 'Slack UTN - Workspace'

    return (
        <>
            <div className='title'>
                <h3>Miembros del espacio de trabajo</h3>
            </div>
            <div className='members-container'>
                {renderMembers()}
            </div>
        </>
    )
}

export default WorkspaceScreen