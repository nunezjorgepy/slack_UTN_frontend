// Página sólo para ver cómo qeudan lo que voy creando. Después hay que eliminarla
import HeaderComponent from '../../components/layout/HeaderComponent/HeaderComponent'
import ShowSuccesComponent from '../../components/ui/ShowSuccesComponent/ShowSuccesComponent'
import './DevelopmentScreen.css'

function DevelopmentScreen() {
    return (
        <>
            <HeaderComponent />
            <main>
                <section className='development-section'>
                    <ShowSuccesComponent />
                </section>
            </main>
        </>
    )
}

export default DevelopmentScreen