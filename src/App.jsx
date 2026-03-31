import { Routes, Route } from "react-router";
// Import Screens
import HomePageScreen from "./Screens/HomePageScreen/HomePageScreen";
import LogInScreen from "./Screens/LogInScreen/LogInScreen";
import RegisterScreen from "./Screens/RegisterScreen/RegisterScreen";
import VerifyEmailScreen from "./Screens/VerifyEmailScreen/VerifyEmailScreen";
import ResetPasswordRequestScreen from "./Screens/ResetPasswordRequestScreen/ResetPasswordRequestScreen";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePageScreen />} />
        <Route path="/login" element={<LogInScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/verify-email" element={<VerifyEmailScreen />} />
        <Route path="/reset-password-request" element={<ResetPasswordRequestScreen />} />
      </Routes>
    </>
  )
}

export default App
