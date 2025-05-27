import React, { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const AuthForm = ({
  title,
  fields,
  submitText,
  onSubmit,
  loading = false,
  children,
}) => {
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );
  const [showPassword, setShowPassword] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const togglePasswordVisibility = (fieldName) => {
    setShowPassword((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

  return (
    <div className="max-w-md mx-auto bg-white border border-gray-200 shadow-sm rounded-xl p-6 sm:p-8">
      <h2 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800 mb-6">
        {title}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {fields.map((field) => (
          <div key={field.name} className="relative">
            <label
              htmlFor={field.name}
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {field.label}
            </label>
            <div className="relative">
              <input
                type={
                  field.type === "password" && showPassword[field.name]
                    ? "text"
                    : field.type
                }
                id={field.name}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                required={field.required}
                placeholder={field.placeholder}
                className="w-full px-3 py-2 sm:py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base transition-all"
              />
              {field.type === "password" && (
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility(field.name)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword[field.name] ? <FiEyeOff /> : <FiEye />}
                </button>
              )}
            </div>
          </div>
        ))}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Loading..." : submitText}
        </button>
      </form>

      {children && (
        <div className="mt-4 text-sm text-center text-gray-600">{children}</div>
      )}
    </div>
  );
};

export default AuthForm;
