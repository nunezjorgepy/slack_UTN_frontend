import { Routes, Route } from "react-router";
// Import Screens
import HomePageScreen from "./Screens/HomePageScreen/HomePageScreen";
import WorkspaceScreen from "./Screens/WorkspaceScreen/WorkspaceScreen";
import LogInScreen from "./Screens/LogInScreen/LogInScreen";
import RegisterScreen from "./Screens/RegisterScreen/RegisterScreen";
import VerifyEmailScreen from "./Screens/VerifyEmailScreen/VerifyEmailScreen";
import ResetPasswordRequestScreen from "./Screens/ResetPasswordRequestScreen/ResetPasswordRequestScreen";
import ResetPasswordScreen from "./Screens/ResetPasswordScreen/ResetPasswordScreen";
// General constants
import { LINKS_TO_OWN_SCREENS } from "./constants/general.constants";
import AuthMiddleware from "./middlewares/AuthMiddleware";
import VerifyWorkspaceMiddleware from "./middlewares/VerifyWorkspaceMiddleware";
import CreateWorkspaceScreen from "./Screens/CreateWorkspaceScreen/CreateWorkspaceScreen";
import ResponseToInvitationScreen from "./Screens/ResponseToInvitationScreen/ResponseToInvitationScreen";

function App() {

  return (
    <>
      <Routes>
        <Route element={<AuthMiddleware />}>
          <Route path="/" element={<HomePageScreen />} />
          <Route element={<VerifyWorkspaceMiddleware />}>
            <Route path="/workspace/:workspaceId" element={<WorkspaceScreen />} />
          </Route>
          <Route path="/:workspaceId/response-to-invitation" element={<ResponseToInvitationScreen />} />
          <Route path={LINKS_TO_OWN_SCREENS.create_workspace} element={<CreateWorkspaceScreen />} />
        </Route>
        
        <Route path={LINKS_TO_OWN_SCREENS.login} element={<LogInScreen />} />
        <Route path={LINKS_TO_OWN_SCREENS.register} element={<RegisterScreen />} />
        <Route path={LINKS_TO_OWN_SCREENS.verify_email} element={<VerifyEmailScreen />} />
        <Route path={LINKS_TO_OWN_SCREENS.reset_password_request} element={<ResetPasswordRequestScreen />} />
        <Route path={LINKS_TO_OWN_SCREENS.reset_password} element={<ResetPasswordScreen />} />
      </Routes>
    </>
  )
}

export default App
