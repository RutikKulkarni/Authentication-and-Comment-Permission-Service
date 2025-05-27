import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiCopy } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [resetToken, setResetToken] = useState("");
  const [showToken, setShowToken] = useState(false);
  const [copied, setCopied] = useState(false);
  const { forgotPassword, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleForgotPassword = async (formData) => {
    setLoading(true);
    const result = await forgotPassword(formData.email);
    setLoading(false);

    if (result.success) {
      setResetToken(result.resetToken);
      setShowToken(true);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(resetToken);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const forgotPasswordFields = [
    {
      name: "email",
      type: "email",
      label: "Email Address",
      placeholder: "Enter your email address",
      required: true,
    },
  ];

  if (user) {
    return null;
  }

  return (
    <div className="px-4 py-8 flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        {!showToken ? (
          <AuthForm
            title="Forgot Password"
            fields={forgotPasswordFields}
            submitText="Generate Reset Token"
            onSubmit={handleForgotPassword}
            loading={loading}
          >
            <p className="text-center text-sm text-gray-600">
              Remember your password?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:underline font-medium"
              >
                Login here
              </Link>
            </p>
          </AuthForm>
        ) : (
          <div className="bg-white rounded-xl shadow-xl p-6">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
              Reset Token Generated
            </h2>

            <div className="bg-green-100 border border-green-300 rounded-lg p-4 mb-5">
              <p className="text-sm text-green-700">
                Token generated successfully!
              </p>
            </div>

            <div className="bg-gray-100 rounded-md p-3 mb-5 border border-gray-300 flex items-start justify-between">
              <div className="flex-1 pr-3">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs text-gray-600 m-0">Reset Token:</p>
                  <button
                    onClick={copyToClipboard}
                    className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 p-1 rounded transition-colors"
                    aria-label="Copy reset token"
                    title="Copy reset token"
                  >
                    <FiCopy size={14} />
                    <span className="text-sm">Copy</span>
                  </button>
                </div>
                {copied && (
                  <p className="text-green-600 text-sm mb-4 text-center select-none">
                    Copied to clipboard!
                  </p>
                )}
                <p className="font-mono text-sm break-all bg-white p-2 rounded border border-gray-200">
                  {resetToken}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <Link
                to="/reset-password"
                className="block w-full text-center py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                Reset Password
              </Link>

              <Link
                to="/login"
                className="block text-center text-sm text-blue-600 hover:underline font-medium"
              >
                Back to Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
