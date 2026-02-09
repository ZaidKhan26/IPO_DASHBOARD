import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children, adminOnly = false }) {
    const location = useLocation();
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    const role = localStorage.getItem("role") || sessionStorage.getItem("role");

    if (!token || token === "undefined" || token === "null") {
        // If it's an admin route, redirect to admin-login, otherwise normal login
        const redirectPath = location.pathname.startsWith("/admin") ? "/admin-login" : "/login";
        return <Navigate to={redirectPath} replace />;
    }

    if (adminOnly && role !== "admin") {
        return <Navigate to="/home" replace />;
    }

    return children;
}

export default ProtectedRoute;
