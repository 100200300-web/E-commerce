import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  let user = localStorage.getItem("token");
  console.log(localStorage.getItem("token"));

  if (!user) {
    return <Navigate to={"/Login"} />;
  }
  return <>{children}</>;
}
