'use client';
import { useState } from 'react';
import { MessageCircle, Send, Trash2, Reply, User } from 'lucide-react';

export default function CommentsSection({ blogId }) {
  const [comments, setComments] = useState([
    {
      id: '1',
      author: 'John Doe',
      authorId: 'user1',
      content: 'Great article! Really insightful about the future of hydrogen aviation.',
      createdAt: '2024-01-16T10:00:00Z',
      replies: [
        {
          id: '1-1',
          author: 'Dr. Sarah Chen',
          authorId: 'admin',
          content: 'Thank you! We\'re excited about the developments in this field.',
          createdAt: '2024-01-16T11:00:00Z',
          replies: []
        }
      ]
    },
    {
      id: '2',
      author: 'Jane Smith',
      authorId: 'user2',
      content: 'The comparison between hydrogen and battery systems is very clear. Looking forward to more technical details.',
      createdAt: '2024-01-15T14:30:00Z',
      replies: []
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState('');

  // Mock current user - in real app, get from auth
  const currentUser = { id: 'user3', name: 'Alex Johnson', isAdmin: false };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now().toString(),
      author: currentUser.name,
      authorId: currentUser.id,
      content: newComment,
      createdAt: new Date().toISOString(),
      replies: []
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  const handleAddReply = (parentId) => {
    if (!replyContent.trim()) return;

    const reply = {
      id: `${parentId}-${Date.now()}`,
      author: currentUser.name,
      authorId: currentUser.id,
      content: replyContent,
      createdAt: new Date().toISOString(),
      replies: []
    };

    setComments(comments.map(comment => {
      if (comment.id === parentId) {
        return { ...comment, replies: [...comment.replies, reply] };
      }
      return comment;
    }));

    setReplyContent('');
    setReplyingTo(null);
  };

  const handleDeleteComment = (commentId, isReply = false, parentId = null) => {
    if (isReply) {
      setComments(comments.map(comment => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: comment.replies.filter(reply => reply.id !== commentId)
          };
        }
        return comment;
      }));
    } else {
      setComments(comments.filter(comment => comment.id !== commentId));
    }
  };

  const canDelete = (authorId) => {
    return currentUser.isAdmin || currentUser.id === authorId;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const CommentItem = ({ comment, isReply = false, parentId = null }) => (
    <div className={`flex gap-3 md:gap-4 ${isReply ? 'ml-6 md:ml-12 mt-4' : 'mb-6'}`}>
      <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
        <User className="w-4 h-4 md:w-5 md:h-5 text-white" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
          <span className="font-semibold text-white text-sm md:text-base">{comment.author}</span>
          <div className="flex items-center gap-2">
            <span className="text-xs md:text-sm text-gray-400">{formatDate(comment.createdAt)}</span>
            {comment.authorId === 'admin' && (
              <span className="px-2 py-1 bg-blue-600 text-xs text-white rounded">Author</span>
            )}
          </div>
        </div>

        <p className="text-gray-300 mb-3 leading-relaxed text-sm md:text-base">{comment.content}</p>

        <div className="flex flex-wrap items-center gap-2 md:gap-4">
          {!isReply && (
            <button
              onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
              className="flex items-center gap-1 text-xs md:text-sm text-gray-400 hover:text-white transition-colors"
            >
              <Reply className="w-3 h-3 md:w-4 md:h-4" />
              Reply
            </button>
          )}

          {canDelete(comment.authorId) && (
            <button
              onClick={() => handleDeleteComment(comment.id, isReply, parentId)}
              className="flex items-center gap-1 text-xs md:text-sm text-red-400 hover:text-red-300 transition-colors"
            >
              <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
              Delete
            </button>
          )}
        </div>

        {/* Reply Form */}
        {replyingTo === comment.id && (
          <div className="mt-4 p-3 md:p-4 bg-gray-800 rounded-lg">
            <div className="flex gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Write a reply..."
                  className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm md:text-base"
                  rows={3}
                />
                <div className="flex flex-col sm:flex-row justify-end gap-2 mt-2">
                  <button
                    onClick={() => setReplyingTo(null)}
                    className="px-3 md:px-4 py-2 text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleAddReply(comment.id)}
                    className="px-3 md:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    <Send className="w-3 h-3 md:w-4 md:h-4" />
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Nested Replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-4">
            {comment.replies.map(reply => (
              <CommentItem
                key={reply.id}
                comment={reply}
                isReply={true}
                parentId={comment.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="mt-16 pt-8 border-t border-gray-800">
      <div className="flex items-center gap-2 mb-8">
        <MessageCircle className="w-6 h-6" />
        <h3 className="text-2xl font-bold">Comments ({comments.length})</h3>
      </div>

      {/* Add Comment Form */}
      <div className="mb-8 p-4 md:p-6 bg-gray-800 rounded-xl">
        <div className="flex gap-3 md:gap-4">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-white mb-2 text-sm md:text-base">Add a comment</h4>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts..."
              className="w-full p-3 md:p-4 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-sm md:text-base"
              rows={4}
            />
            <div className="flex justify-end mt-3">
              <button
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                className="px-4 md:px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 text-sm md:text-base"
              >
                <Send className="w-3 h-3 md:w-4 md:h-4" />
                Post Comment
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.length > 0 ? (
          comments.map(comment => (
            <CommentItem key={comment.id} comment={comment} />
          ))
        ) : (
          <div className="text-center py-8">
            <MessageCircle className="w-12 h-12 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400">No comments yet. Be the first to share your thoughts!</p>
          </div>
        )}
      </div>
    </div>
  );
}