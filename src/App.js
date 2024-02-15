import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterPage from "./pages/Register/RegisterPage";
import LoginPage from "./pages/Login/LoginPage";
import HomePage from "./pages/Home/HomePage";
import JobpostPage from "./pages/Jobpost/JobpostPage";
import JobinfoPage from "./pages/Jobinfo/JobinfoPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/job-info/:id" element={<JobinfoPage />} />
        <Route path="/job-post" element={<JobpostPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
