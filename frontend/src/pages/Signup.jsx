import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const { signup, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSignup = async (formData) => {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);
    const result = await signup(
      formData.name,
      formData.email,
      formData.password
    );
    setLoading(false);

    if (result.success) {
      navigate("/login");
    }
  };

  const signupFields = [
    {
      name: "name",
      type: "text",
      label: "Full Name",
      placeholder: "Enter your full name",
      required: true,
    },
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
    {
      name: "confirmPassword",
      type: "password",
      label: "Confirm Password",
      placeholder: "Confirm your password",
      required: true,
    },
  ];

  if (user) {
    return null;
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-6 sm:px-6 lg:px-8">
      <AuthForm
        title="Create Your Account"
        fields={signupFields}
        submitText={loading ? "Signing up..." : "Sign Up"}
        onSubmit={handleSignup}
        loading={loading}
      >
        <p className="mt-6 text-center text-gray-600 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors"
          >
            Login here
          </Link>
        </p>
      </AuthForm>
    </div>
  );
};

export default Signup;
