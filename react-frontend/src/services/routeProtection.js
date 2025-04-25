import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";


// Somewhere in your component

const ProtectedRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token);
  return token ? children : <Redirect to="/login" replace />;
};

export default ProtectedRoute;
