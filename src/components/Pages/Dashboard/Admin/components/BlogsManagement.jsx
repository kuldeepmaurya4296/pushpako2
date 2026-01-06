import Link from 'next/link';
import { Edit, Eye, Trash2, Plus, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { AddEditBlogDialog } from './BlogOperations';
import { DeleteDialog } from '@/components/ui/DeleteDialog';
import toast from 'react-hot-toast';

export default function BlogsManagement() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  // Fetch blogs from API
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/blogs');
      if (!response.ok) {
        throw new Error('Failed to fetch blogs');
      }
      const data = await response.json();
      setBlogs(data.blogs || []);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: '',
    category: 'Technology',
    tags: [],
    featuredImage: '',
    readTime: 5,
    isPublished: false,
    isFeatured: false,
  });

  const handleAddBlog = () => {
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      author: '',
      category: 'Technology',
      tags: [],
      featuredImage: '',
      readTime: 5,
      isPublished: false,
      isFeatured: false,
    });
    setIsAddDialogOpen(true);
  };

  const handleEditBlog = (blog) => {
    setSelectedBlog(blog);
    setFormData({
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      author: blog.author,
      category: blog.category,
      tags: blog.tags,
      featuredImage: blog.featuredImage,
      readTime: blog.readTime,
      isPublished: blog.isPublished,
      isFeatured: blog.isFeatured,
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteBlog = (blog) => {
    setSelectedBlog(blog);
    setIsDeleteDialogOpen(true);
  };

  const handleSubmitAdd = async () => {
    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          authorId: 'admin',
          images: [],
          videos: [],
          views: 0,
          likes: 0,
          comments: [],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create blog');
      }

      await fetchBlogs(); // Refresh the list
      setIsAddDialogOpen(false);
      toast.success('Blog created successfully');
    } catch (error) {
      console.error('Error creating blog:', error);
      toast.error('Failed to create blog');
    }
  };

  const handleSubmitEdit = async () => {
    try {
      const response = await fetch(`/api/blogs/${selectedBlog._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to update blog');
      }

      await fetchBlogs(); // Refresh the list
      setIsEditDialogOpen(false);
      setSelectedBlog(null);
      toast.success('Blog updated successfully');
    } catch (error) {
      console.error('Error updating blog:', error);
      toast.error('Failed to update blog');
    }
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`/api/blogs/${selectedBlog._id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete blog');
      }

      await fetchBlogs(); // Refresh the list
      setIsDeleteDialogOpen(false);
      setSelectedBlog(null);
      toast.success('Blog deleted successfully');
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast.error('Failed to delete blog');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
        <span className="ml-2 text-gray-300">Loading blogs...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8">
        <div className="bg-red-900 border border-red-700 rounded-lg p-4">
          <h3 className="text-red-400 font-semibold">Error loading blogs</h3>
          <p className="text-red-300 mt-1">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Blog Management</h2>
        <button className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2" onClick={handleAddBlog}>
          <Plus className="w-4 h-4" />
          Add New Blog
        </button>
      </div>

      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Blog</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Author</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Views</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {blogs.map((blog) => (
                <tr key={blog._id} className="hover:bg-gray-750">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img className="h-10 w-10 rounded-lg object-cover" src={blog.featuredImage} alt={blog.title} />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-white line-clamp-1">{blog.title}</div>
                        <div className="text-sm text-gray-400">{new Date(blog.createdAt).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">{blog.author}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{blog.category}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      blog.isPublished ? 'bg-green-600 text-white' : 'bg-yellow-600 text-white'
                    }`}>
                      {blog.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">{blog.views}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/blogs/${blog.slug}`} target='_blank'
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button className="text-yellow-400 hover:text-yellow-300 transition-colors" onClick={() => handleEditBlog(blog)}>
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-red-400 hover:text-red-300 transition-colors" onClick={() => handleDeleteBlog(blog)}>
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Blog Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Total Blogs</h3>
          <p className="text-3xl font-bold text-blue-400">{blogs.length}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Published</h3>
          <p className="text-3xl font-bold text-green-400">{blogs.filter(b => b.isPublished).length}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Total Views</h3>
          <p className="text-3xl font-bold text-yellow-400">{blogs.reduce((sum, b) => sum + (b.views || 0), 0)}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Total Comments</h3>
          <p className="text-3xl font-bold text-purple-400">{blogs.reduce((sum, b) => sum + (b.comments?.length || 0), 0)}</p>
        </div>
      </div>

      <AddEditBlogDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSubmit={handleSubmitAdd}
        formData={formData}
        setFormData={setFormData}
        isEdit={false}
      />

      <AddEditBlogDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSubmit={handleSubmitEdit}
        formData={formData}
        setFormData={setFormData}
        isEdit={true}
      />

      <DeleteDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleConfirmDelete}
        title="Delete Blog"
        itemName={selectedBlog?.title}
        itemType="blog"
      />
    </div>
  );
}