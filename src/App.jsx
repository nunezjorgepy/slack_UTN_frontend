import { Routes, Route } from "react-router";
// Import Screens
import HomePageScreen from "./Screens/HomePageScreen/HomePageScreen";
import LogInScreen from "./Screens/LogInScreen/LogInScreen";
import RegisterScreen from "./Screens/RegisterScreen/RegisterScreen";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePageScreen />} />
        <Route path="/login" element={<LogInScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
      </Routes>
    </>
  )
}

export default App
