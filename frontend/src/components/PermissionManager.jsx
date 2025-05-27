import React, { useState, useEffect } from "react";
import { FiSettings, FiCheck, FiX } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import toast from "react-hot-toast";

const PermissionManager = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userPermissions, setUserPermissions] = useState([]);
  const [tempPermissions, setTempPermissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, permissions, setPermissions } = useAuth();

  const availablePermissions = ["read", "write", "delete"];

  useEffect(() => {
    if (isOpen) {
      fetchUserPermissions();
    }
  }, [isOpen]);

  const fetchUserPermissions = async () => {
    try {
      setUserPermissions([...permissions]);
      setTempPermissions([...permissions]);
    } catch (error) {
      console.error("Error fetching permissions:", error);
    }
  };

  const togglePermission = (permission) => {
    setTempPermissions((prev) =>
      prev.includes(permission)
        ? prev.filter((p) => p !== permission)
        : [...prev, permission]
    );
  };

  const handleSave = async () => {
    if (!user) return;

    setLoading(true);
    try {
      await api.put(`/users/permissions/${user.id}`, {
        permissions: tempPermissions,
      });

      setUserPermissions([...tempPermissions]);
      setPermissions([...tempPermissions]);
      setIsOpen(false);
      toast.success("Permissions updated successfully!");
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to update permissions";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setTempPermissions([...userPermissions]);
    setIsOpen(false);
  };

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-neutral-800 text-white rounded-full hover:bg-neutral-900 transition-colors shadow-sm"
      >
        <FiSettings className="text-lg" />
        <span className="text-sm font-medium">Manage Permissions</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-96 bg-white border border-gray-200 rounded-2xl shadow-xl z-50">
          <div className="p-5">
            <h3 className="text-xl font-semibold text-neutral-800 mb-5">
              Manage Your Permissions
            </h3>

            <div className="space-y-4">
              {availablePermissions.map((permission) => (
                <div
                  key={permission}
                  className="flex items-start justify-between"
                >
                  <div className="flex-1 pr-4">
                    <div className="text-base font-medium text-neutral-700 capitalize">
                      {permission}
                    </div>
                    <p className="text-sm text-neutral-500 mt-0.5">
                      {permission === "read" && "Can view comments"}
                      {permission === "write" && "Can add new comments"}
                      {permission === "delete" && "Can delete any comment"}
                    </p>
                  </div>
                  <button
                    onClick={() => togglePermission(permission)}
                    className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all duration-200 ${
                      tempPermissions.includes(permission)
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "border-gray-300 hover:border-blue-400"
                    }`}
                  >
                    {tempPermissions.includes(permission) && (
                      <FiCheck size={16} />
                    )}
                  </button>
                </div>
              ))}
            </div>

            <div className="flex justify-end items-center gap-3 mt-6 pt-4 border-t border-gray-100">
              <button
                onClick={handleCancel}
                className="flex items-center gap-1 px-4 py-2 text-sm text-gray-600 hover:text-gray-800 transition"
              >
                <FiX className="text-base" />
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiCheck />
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PermissionManager;
