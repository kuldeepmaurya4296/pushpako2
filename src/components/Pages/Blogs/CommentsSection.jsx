"use client";
import { useState, useEffect } from "react";
import { User, Send, Loader2, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

export default function CommentsSection({ blogId }) {
  const { data: session } = useSession();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchComments();
  }, [blogId]);

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/blogs/${blogId}/comments`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setComments(data);
      }
    } catch (error) {
      console.error("Failed to fetch comments", error);
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    if (!session) {
      toast.error("Please sign in to comment");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/blogs/${blogId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          author: session.user.name || "Anonymous",
          content: newComment,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setComments((prev) => [...prev, data]);
        setNewComment("");
        toast.success("Comment added!");
      } else {
        toast.error(data.error || "Failed to add comment");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-12 pt-8 border-t border-gray-800">
      <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
        Comments <span className="text-gray-500 text-lg">({comments.length})</span>
      </h3>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-10">
        <div className="relative">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={session ? "Write a comment..." : "Sign in to write a comment"}
            disabled={!session}
            className="w-full bg-gray-900 border border-gray-800 rounded-xl p-4 pr-12 text-white focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            rows="3"
          />
          <button
            type="submit"
            disabled={!session || loading || !newComment.trim()}
            className="absolute bottom-3 right-3 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
          </button>
        </div>
        {!session && (
          <p className="text-sm text-gray-500 mt-2">
            You must be signed in to post a comment.
          </p>
        )}
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {fetching ? (
          <div className="flex justify-center py-4">
            <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
          </div>
        ) : comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="flex gap-4 p-4 bg-gray-800/50 rounded-xl">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {comment.author?.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold text-white">{comment.author}</h4>
                    <p className="text-xs text-gray-500">
                      {new Date(comment.createdAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                  {comment.content}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500 bg-gray-900/50 rounded-xl">
            No comments yet. Be the first to start the conversation!
          </div>
        )}
      </div>
    </div>
  );
}