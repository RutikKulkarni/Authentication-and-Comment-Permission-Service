import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = async (formData) => {
    setLoading(true);
    const result = await login(formData.email, formData.password);
    setLoading(false);

    if (result.success) {
      navigate("/");
    }
  };

  const loginFields = [
    {
      name: "email",
      type: "email",
      label: "Email Address",
      placeholder: "Enter your email",
      required: true,
    },
    {
      name: "password",
      type: "password",
      label: "Password",
      placeholder: "Enter your password",
      required: true,
    },
  ];

  if (user) {
    return null;
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <AuthForm
        title="Login to Your Account"
        fields={loginFields}
        submitText={loading ? "Logging in..." : "Login"}
        onSubmit={handleLogin}
        loading={loading}
      >
        <div className="mt-6 space-y-3 text-center text-gray-600 text-sm">
          <p>
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors"
            >
              Sign up here
            </Link>
          </p>
          <p>
            <Link
              to="/forgot-password"
              className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors"
            >
              Forgot your password?
            </Link>
          </p>
        </div>
      </AuthForm>
    </div>
  );
};

export default Login;
