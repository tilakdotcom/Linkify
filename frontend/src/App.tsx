import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import MainLayout from "./layout/MainLayout";
import SignupPage from "./pages/auth/SignupPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/register" element={<SignupPage />} />
          <Route path="/user" element={<div>user</div>} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
