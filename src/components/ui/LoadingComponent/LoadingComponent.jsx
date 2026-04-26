import './LoadingComponent.css'

function LoadingComponent() {
    return (
        <>
            <div className="loading-component-container">
                {/* Grid para centrar los elementos */}
                <div className="loading-component-grid">

                    {/* Barras superior izquierda */}
                    <div className="loading-component-square loading-flex-column top-left">
                        <div className="loading-draw-container justify-end">
                            <div className="loading-draw loading-width-small loading-component-tl-short"></div>
                        </div>
                        <div className="loading-draw-container">
                            <div className="loading-draw loading-width-big loading-component-tl-long"></div>
                        </div>
                    </div>

                    {/* Barras superior derecha */}
                    <div className="loading-component-square top-right">
                        <div className="loading-draw-container">
                            <div className="loading-draw loading-height-big loading-component-tr-long"></div>
                        </div>
                        <div className="loading-draw-container align-end">
                            <div className="loading-draw loading-height-small loading-component-tr-short"></div>
                        </div>
                    </div>

                    {/* Barras inferior izquierda */}
                    <div className="loading-component-square bottom-left">
                        <div className="loading-draw-container">
                            <div className="loading-draw loading-height-small loading-component-bl-short"></div>
                        </div>
                        <div className="loading-draw-container">
                            <div className="loading-draw loading-height-big loading-component-bl-long"></div>
                        </div>
                    </div>

                    {/* Barras inferior derecha */}
                    <div className="loading-component-square loading-flex-column bottom-right">
                        <div className="loading-draw-container">
                            <div className="loading-draw loading-width-big loading-component-br-long"></div>
                        </div>
                        <div className="loading-draw-container">
                            <div className="loading-draw loading-width-small loading-component-br-short"></div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default LoadingComponent