import React, { useState } from "react";
import { FiTrash2, FiUser, FiClock } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import toast from "react-hot-toast";

const CommentList = ({ comments, setComments }) => {
  const [loading, setLoading] = useState(false);
  const { hasPermission } = useAuth();

  const handleDelete = async (commentId) => {
    if (!hasPermission("delete")) {
      toast.error("You do not have permission to delete comments");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this comment?")) {
      return;
    }

    setLoading(true);
    try {
      await api.delete(`/comments/${commentId}`);
      setComments((prev) => prev.filter((c) => c._id !== commentId));
      toast.success("Comment deleted successfully!");
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to delete comment";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString() +
      " " +
      date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  };

  if (!hasPermission("read")) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-yellow-800 text-sm">
          You do not have permission to read comments.
        </p>
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-8 text-center border border-gray-100">
        <p className="text-gray-500 text-lg">
          No comments yet. Be the first to comment!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div
          key={comment._id}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-5"
        >
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-2 text-gray-700">
              <FiUser className="text-gray-500" />
              <span className="font-medium">{comment.user.name}</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <FiClock />
                <span>{formatDate(comment.createdAt)}</span>
              </div>

              {hasPermission("delete") && (
                <button
                  onClick={() => handleDelete(comment._id)}
                  disabled={loading}
                  className="text-red-500 hover:text-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition"
                  title="Delete comment"
                >
                  <FiTrash2 size={16} />
                </button>
              )}
            </div>
          </div>

          <p className="text-gray-700 text-sm leading-relaxed">
            {comment.content}
          </p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
