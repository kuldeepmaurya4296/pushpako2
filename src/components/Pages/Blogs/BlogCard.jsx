'use client';
import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, Clock, Eye, Heart, User, ArrowRight } from 'lucide-react';

export default function BlogCard({ blog, index }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      whileHover={{ y: -5 }}
      className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
      style={{ willChange: 'transform' }}
    >
      <Link href={`/blogs/${blog.id}`}>
        <div className="relative overflow-hidden">
          <motion.img
            src={blog.featuredImage}
            alt={blog.title}
            className="w-full h-48 object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute top-4 left-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
              {blog.category}
            </span>
          </motion.div>
          {blog.isFeatured && (
            <motion.div
              className="absolute top-4 right-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <span className="px-3 py-1 bg-yellow-600 text-white text-xs font-semibold rounded-full">
                Featured
              </span>
            </motion.div>
          )}

          {/* Overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={false}
          >
            <motion.div
              className="flex items-center gap-2 text-white font-medium"
              whileHover={{ scale: 1.05 }}
            >
              <span>Read Article</span>
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </motion.div>
        </div>
      </Link>

      <div className="p-6">
        <Link href={`/blogs/${blog.id}`}>
          <motion.h3
            className="text-lg md:text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2"
            whileHover={{ scale: 1.02 }}
          >
            {blog.title}
          </motion.h3>
        </Link>

        <motion.p
          className="text-gray-300 mb-4 line-clamp-3 text-sm md:text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {blog.excerpt}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-400 mb-4 gap-2 sm:gap-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span className="truncate">{blog.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(blog.publishedAt)}</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center gap-1 text-sm text-gray-400">
            <Clock className="w-4 h-4" />
            <span>{blog.readTime} min</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-400">
            <Eye className="w-4 h-4" />
            <span>{blog.views}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-gray-400">
            <Heart className="w-4 h-4" />
            <span>{blog.likes}</span>
          </div>
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {blog.tags.slice(0, 3).map((tag, tagIndex) => (
            <motion.span
              key={tag}
              className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-md hover:bg-gray-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + tagIndex * 0.1 }}
            >
              #{tag}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </motion.article>
  );
}