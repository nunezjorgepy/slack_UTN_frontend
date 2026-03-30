import './HomePageScreen.css'

// Import Components
import HeaderComponent from "../../components/layout/HeaderComponent/HeaderComponent"
import FooterComponent from "../../components/layout/FooterComponent/FooterComponent"

function HomePageScreen() {
    // Cambia el título de la página
    document.title = 'Slack UTN - Home'

    return (
        <>
            <HeaderComponent />
            <main>
                <h1>HomePageScreen</h1>
            </main>
            <FooterComponent />
        </>
    )
}

export default HomePageScreen