import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import AuthContextProvider from './context/authContext.jsx'
import WorkspaceContextProvider from './context/workspaceContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthContextProvider>
      <WorkspaceContextProvider>
        <App />
      </WorkspaceContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
)
