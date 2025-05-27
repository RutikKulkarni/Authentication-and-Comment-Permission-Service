import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";
import PermissionManager from "../components/PermissionManager";
import api from "../utils/api";
import toast from "react-hot-toast";

const Home = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, hasPermission, setPermissions } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    fetchUserPermissions();
    fetchComments();
  }, [user, navigate]);

  const fetchUserPermissions = async () => {
    try {
      const mockPermissions = ["read"];
      setPermissions(mockPermissions);
    } catch (error) {
      console.error("Error fetching permissions:", error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await api.get("/comments");
      setComments(response.data);
    } catch (error) {
      if (error.response?.status === 403) {
        toast.error("You do not have permission to view comments");
      } else {
        const message =
          error.response?.data?.message || "Failed to fetch comments";
        toast.error(message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCommentAdded = (newComment) => {
    setComments((prev) => [newComment, ...prev]);
  };

  if (!user) {
    return null;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[16rem]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Welcome, <span>{user.name}</span>!
          </h1>
          <p className="text-gray-600 mt-2 max-w-md">
            Share your thoughts and engage with the community.
          </p>
        </div>
        <PermissionManager />
      </header>

      <section className="bg-indigo-50 border border-indigo-200 rounded-xl p-5 mb-8 shadow-sm">
        <h3 className="font-semibold text-indigo-700 mb-3 tracking-wide">
          Your Current Permissions:
        </h3>
        <div className="flex flex-wrap gap-3">
          {["read", "write", "delete"].map((permission) => (
            <span
              key={permission}
              className={`px-4 py-1 rounded-full text-sm font-semibold tracking-wide ${
                hasPermission(permission)
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-400"
              }`}
            >
              {permission.toUpperCase()}
            </span>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <CommentForm onCommentAdded={handleCommentAdded} />
      </section>

      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-8 border-b border-gray-200 pb-3">
          Comments
        </h2>
        <CommentList comments={comments} setComments={setComments} />
      </section>
    </main>
  );
};

export default Home;
