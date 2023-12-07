import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  
  const { jti } =  JSON.parse(localStorage.getItem('userData' ||null)) ??{};
  if (!jti) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }
  return children;
};

export const Protected = ({ children }) => {
  const { jti } =  JSON.parse(localStorage.getItem('userData' ||null))??{};
  if (jti) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return children;
};