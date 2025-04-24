import { Route, Routes, useLocation } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import MainLayout from "./layout/MainLayout";
import SignupPage from "./pages/auth/SignupPage";
import LoginPage from "./pages/auth/LoginPage";
import { useAppDispatch, useTypeSelector } from "./store/store";
import Loading from "./components/common/Loading";
import { useEffect } from "react";
import { checkAuth, setAuthenticated } from "./store/auth/authSlice";
import { CheckAuth } from "./layout/CheckAuth";
import UserPage from "./pages/user/UserPage";
import RedirectPage from "./pages/common/GetLinkPage";

function App() {
  const { isAuthenticated, isLoading, user } = useTypeSelector(
    (state) => state.auth
  );
  const dispatch = useAppDispatch();
  const location = useLocation();

  const from = location.state?.from;

  useEffect(() => {
    if (user === null) {
      dispatch(setAuthenticated(false));
    } else {
      dispatch(checkAuth());
    }
  }, [dispatch, user]);

  if (isLoading) return <Loading />;
  return (
    <>
      <Routes>
        <Route
          element={
            <CheckAuth isAuthenticated={isAuthenticated} redirectPath={from} />
          }
        >
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/register" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/user" element={<UserPage />} />
          </Route>
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/:short" element={<RedirectPage />} />

          <Route path="*" element={<div>404 Not Found</div>} />
        </Route>

        {/* 404 Not Found */}

        {/* Redirect to 404 page if no route matches */}
      </Routes>
    </>
  );
}

export default App;
