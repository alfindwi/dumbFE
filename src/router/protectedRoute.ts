// import React from "react";
// import Cookies from "js-cookie";
// import { useLocation, Navigate } from "react-router-dom";

// const ProtectedRoute = ({children,allowedRole}: {children: React.ReactNode; allowedRole: string[]}) => {
//     const token = Cookies.get("token");
//     const userRole = Cookies.get("role");
//     const location = useLocation();

//     if(!token){
//         return <Navigate to="/login" state={{ from: location }} replace />;
//     }

//     if(!allowedRole.includes(userRole ?? '')){
//         return <Navigate to="/login" state={{ from: location }} replace />;
//     }
  
//   return children;
// };
