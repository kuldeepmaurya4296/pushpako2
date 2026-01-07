'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, Eye, Heart, Share2, User, MessageCircle, Trash2, Reply } from 'lucide-react';
import CommentsSection from './CommentsSection';

export default function BlogDetail({ blog }) {
  const [isLiked, setIsLiked] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-[#060B18] text-white mt-14">
      {/* Header */}
      <div className="border-b border-gray-800 bg-[#060B18]/95 backdrop-blur-sm">
        <div className="container mx-auto px-6 lg:px-10 py-4">
          <div>
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
            >
              <div>
                <ArrowLeft className="w-4 h-4" />
              </div>
              <span className="group-hover:translate-x-1 transition-transform duration-200">Back to Blogs</span>
            </Link>
          </div>
        </div>
      </div>

      <article className="container mx-auto px-6 lg:px-10 py-12">
        {/* Hero Section */}
        <div
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="relative mb-8">
            <img
              src={blog.featuredImage}
              alt={blog.title}
              className="w-full h-64 md:h-96 object-cover rounded-xl shadow-2xl"
            />
            <div
              className="absolute top-4 left-4"
            >
              <span className="px-3 py-1 bg-blue-600 text-white text-sm font-semibold rounded-full">
                {blog.category}
              </span>
            </div>
            {blog.isFeatured && (
              <div
                className="absolute top-4 right-4"
              >
                <span className="px-3 py-1 bg-yellow-600 text-white text-sm font-semibold rounded-full">
                  Featured
                </span>
              </div>
            )}
          </div>

          <div
            className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6"
          >
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{blog.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(blog.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{blog.readTime} min read</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span>{blog.views} views</span>
            </div>
          </div>

          <h1
            className="text-3xl md:text-5xl font-bold mb-6 leading-tight"
          >
            {blog.title}
          </h1>

          <p
            className="text-xl text-gray-300 mb-8 leading-relaxed"
          >
            {blog.excerpt}
          </p>

          {/* Tags */}
          <div
            className="flex flex-wrap gap-2 mb-8"
          >
            {blog.tags.map((tag, index) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-800 text-gray-300 text-sm rounded-full hover:bg-gray-700 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Action Buttons */}
          <div
            className="flex items-center gap-4"
          >
            <button
              onClick={() => setIsLiked(!isLiked)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isLiked ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              <span>{blog.likes + (isLiked ? 1 : 0)}</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <div
            className="prose prose-lg prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Comments Section */}
          <CommentsSection blogId={blog._id} />
        </div>
      </article>
    </div>
  );
}