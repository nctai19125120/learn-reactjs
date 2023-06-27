import React from "react";
import GoogleLoginComponent from "./components/GoogleLoginComponent";

function LoginFeature(props) {
  return (
    <div className="login-feature">
      <h2>Login Page</h2>
      <GoogleLoginComponent />
    </div>
  );
}

export default LoginFeature;
