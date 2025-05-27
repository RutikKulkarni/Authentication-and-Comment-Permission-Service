import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import toast from "react-hot-toast";

const CommentForm = ({ onCommentAdded }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { hasPermission } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedContent = content.trim();

    if (!trimmedContent) {
      toast.error("Please enter a comment");
      return;
    }

    if (!hasPermission("write")) {
      toast.error("You do not have permission to write comments");
      return;
    }

    setLoading(true);
    try {
      const response = await api.post("/comments", { content: trimmedContent });
      setContent("");
      onCommentAdded(response.data);
      toast.success("Comment added successfully!");
    } catch (error) {
      const message = error.response?.data?.message || "Failed to add comment";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (!hasPermission("write")) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <p className="text-yellow-800 text-sm">
          You do not have permission to write comments.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        Add a Comment
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your comment here..."
            rows={4}
            maxLength={500}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <div className="text-right text-xs text-gray-500 mt-1">
            {content.length}/500
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading || !content.trim()}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-md text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <FiSend size={16} />
            <span>{loading ? "Posting..." : "Post Comment"}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
