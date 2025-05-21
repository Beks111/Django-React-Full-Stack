import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

// Компонент для общего макета с меню
const Layout = () => {
    const location = useLocation();
    const hideMenu = ["/login", "/register"].includes(location.pathname);

    return (
        <div className="app-layout">
            {!hideMenu && (
                <nav className="menu">
                    <h1>Task Management System</h1>
                    <div className="menu-buttons">
                        <button onClick={() => navigate("/")} className="menu-button">
                            Home
                        </button>
                        <button onClick={() => navigate("/logout")} className="menu-button logout-button">
                            Logout
                        </button>
                    </div>
                </nav>
            )}
            <Outlet />
        </div>
    );
};

// Компонент для выхода из системы
function Logout() {
    localStorage.clear();
    return <Navigate to="/login" />;
}

// Компонент для регистрации с очисткой localStorage
function RegisterAndLogout() {
    localStorage.clear();
    return <Register />;
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/register" element={<RegisterAndLogout />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;