import { Routes, Route } from "react-router";
// Import Screens
import HomePageScreen from "./Screens/HomePageScreen/HomePageScreen";
import LogInScreen from "./Screens/LogInScreen/LogInScreen";
import RegisterScreen from "./Screens/RegisterScreen/RegisterScreen";
import VerifyEmailScreen from "./Screens/VerifyEmailScreen/VerifyEmailScreen";
import ResetPasswordRequestScreen from "./Screens/ResetPasswordRequestScreen/ResetPasswordRequestScreen";
import ResetPasswordScreen from "./Screens/ResetPasswordScreen/ResetPasswordScreen";
// General constants
import { LINKS_TO_OWN_SCREENS } from "./constants/general.constants";
import DevelopmentScreen from "./Screens/DevelopmentScreen/DevelopmentScreen";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePageScreen />} />
        <Route path={LINKS_TO_OWN_SCREENS.login} element={<LogInScreen />} />
        <Route path={LINKS_TO_OWN_SCREENS.register} element={<RegisterScreen />} />
        <Route path={LINKS_TO_OWN_SCREENS.verify_email} element={<VerifyEmailScreen />} />
        <Route path={LINKS_TO_OWN_SCREENS.reset_password_request} element={<ResetPasswordRequestScreen />} />
        <Route path={LINKS_TO_OWN_SCREENS.reset_password} element={<ResetPasswordScreen />} />

        {/* TODO: Eliminar */}
        {/* TODO: sólo accesible mediante AuthMiddleware */}
        <Route path={LINKS_TO_OWN_SCREENS.development} element={<DevelopmentScreen />} />
      </Routes>
    </>
  )
}

export default App
