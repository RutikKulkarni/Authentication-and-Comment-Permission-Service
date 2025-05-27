import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const { resetPassword, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleResetPassword = async (formData) => {
    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);
    const result = await resetPassword(
      formData.resetToken,
      formData.newPassword
    );
    setLoading(false);

    if (result.success) {
      navigate("/login");
    }
  };

  const resetPasswordFields = [
    {
      name: "resetToken",
      type: "text",
      label: "Reset Token",
      placeholder: "Enter your reset token",
      required: true,
    },
    {
      name: "newPassword",
      type: "password",
      label: "New Password",
      placeholder: "Enter your new password",
      required: true,
    },
    {
      name: "confirmPassword",
      type: "password",
      label: "Confirm New Password",
      placeholder: "Confirm your new password",
      required: true,
    },
  ];

  if (user) {
    return null;
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <AuthForm
        title="Reset Your Password"
        fields={resetPasswordFields}
        submitText={loading ? "Resetting..." : "Reset Password"}
        onSubmit={handleResetPassword}
        loading={loading}
      >
        <div className="mt-6 space-y-4 text-center text-gray-600 text-sm">
          <p>
            Don&apos;t have a reset token?{" "}
            <Link
              to="/forgot-password"
              className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors"
            >
              Get one here
            </Link>
          </p>
          <p>
            Remember your password?{" "}
            <Link
              to="/login"
              className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors"
            >
              Login here
            </Link>
          </p>
        </div>
      </AuthForm>
    </div>
  );
};

export default ResetPassword;
