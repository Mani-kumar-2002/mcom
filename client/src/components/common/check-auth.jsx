import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();
  
  // Allow access to auth routes when not authenticated
  if (location.pathname.startsWith('/auth/') && !isAuthenticated) {
    return children;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  // Redirect admin to dashboard from home page
  if (user?.role === "admin" && window.location.pathname === "/") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // Redirect customer to shop home from home page
  if (user?.role === "customer" && window.location.pathname === "/") {
    return <Navigate to="/shop/home" replace />;
  }

  // Prevent non-admins from accessing admin routes
  if (window.location.pathname.startsWith("/admin") && user?.role !== "admin") {
    return <Navigate to="/unauth-page" replace />;
  }

  // Allow access to the requested route
  return children;
}

export default CheckAuth;