
'use client';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import BlogCard from './BlogCard';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import RecentBlogs from './RecentBlogs';
import NewsletterSignup from './NewsletterSignup';

export default function BlogsClient({ blogs: initialBlogs }) {
  const [blogs] = useState(initialBlogs || []);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Define categories (you might want to fetch these from API too)
  const blogCategories = ['All', 'Technology', 'Industry', 'Safety', 'Business', 'Sustainability'];

  const filteredBlogs = useMemo(() => {
    let filtered = blogs;

    // Filter by category
    if (activeCategory !== 'All') {
      filtered = filtered.filter(blog => blog.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(query) ||
        blog.excerpt.toLowerCase().includes(query) ||
        (blog.tags && blog.tags.some(tag => tag.toLowerCase().includes(query)))
      );
    }

    return filtered;
  }, [blogs, searchQuery, activeCategory]);

  const recentBlogs = useMemo(() => {
    return [...blogs]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 3);
  }, [blogs]);

  const popularBlogs = useMemo(() => {
    return [...blogs]
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, 3);
  }, [blogs]);

  return (
    <div className="min-h-screen bg-[#060B18] text-white">
      {/* Hero Section */}
      <motion.section
        className="py-8 md:py-12 bg-gradient-to-b from-blue-900/20 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-10 text-center">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our <motion.span
              className="text-blue-400"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Blog
            </motion.span>
          </motion.h1>
          <motion.p
            className="text-base md:text-lg lg:text-xl text-gray-300 max-w-3xl mx-auto mb-6 md:mb-8 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Stay updated with the latest insights, innovations, and developments in hydrogen-powered aviation and urban air mobility.
          </motion.p>
        </div>
      </motion.section>

      {/* Search and Filters */}
      <section className="py-6 md:py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10">
          <SearchBar onSearch={setSearchQuery} />
          <CategoryFilter
            categories={blogCategories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Blog Grid */}
            <div className="lg:col-span-3">
              {filteredBlogs.length > 0 ? (
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {filteredBlogs.map((blog, index) => (
                    <BlogCard key={blog._id} blog={blog} index={index} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-2xl font-bold text-gray-400 mb-4">No blogs found</h3>
                  <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <motion.div
              className="space-y-6 lg:space-y-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <RecentBlogs blogs={recentBlogs} title="Recent Posts" />
              <RecentBlogs blogs={popularBlogs} title="Popular Posts" />

              {/* Newsletter Signup */}
              <motion.div
                className="bg-gray-800 rounded-xl p-4 md:p-6"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <NewsletterSignup />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
