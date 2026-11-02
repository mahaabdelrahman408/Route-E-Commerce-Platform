import { Navigate } from "react-router-dom";

export default function ProtectedRouter({ children }) {
  return localStorage.getItem("userToken")
    ? children
    : <Navigate to="/login" replace />;
}