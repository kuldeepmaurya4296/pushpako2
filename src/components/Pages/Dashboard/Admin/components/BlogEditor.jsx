"use client";
import { useState, useEffect } from "react";
import { X, Save, Image as ImageIcon, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import ImageUpload from "@/components/ui/ImageUpload";

export default function BlogEditor({ blog, onCancel, onSave }) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        author: "Admin", // default
        category: "Technology",
        tags: "",
        featuredImage: "",
        isPublished: true,
        isFeatured: false,
        readTime: 5,
    });

    const categories = [
        "Technology",
        "Industry",
        "Safety",
        "Business",
        "Sustainability",
        "Innovation",
    ];

    useEffect(() => {
        if (blog) {
            setFormData({
                ...blog,
                tags: blog.tags ? blog.tags.join(", ") : "",
            });
        }
    }, [blog]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload = {
                ...formData,
                tags: formData.tags.split(",").map((t) => t.trim()).filter(Boolean),
            };

            const url = blog ? `/api/blogs/${blog._id}` : "/api/blogs";
            const method = blog ? "PUT" : "POST";

            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Something went wrong");
            }

            toast.success(blog ? "Blog updated successfully" : "Blog created successfully");
            onSave();
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-800 rounded-xl p-6">
            <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
                <h2 className="text-xl font-bold text-white">
                    {blog ? "Edit Blog" : "Create New Blog"}
                </h2>
                <button
                    onClick={onCancel}
                    className="p-2 hover:bg-gray-700 rounded-lg transition"
                >
                    <X className="w-5 h-5 text-gray-400" />
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Title */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Title</label>
                        <input
                            type="text"
                            name="title"
                            required
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                            placeholder="Blog Title"
                        />
                    </div>

                    {/* Slug */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Slug</label>
                        <input
                            type="text"
                            name="slug"
                            value={formData.slug}
                            onChange={handleChange}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                            placeholder="auto-generated-if-empty"
                        />
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                        >
                            {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Author */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Author</label>
                        <input
                            type="text"
                            name="author"
                            required
                            value={formData.author}
                            onChange={handleChange}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Tags */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">
                            Tags (comma separated)
                        </label>
                        <input
                            type="text"
                            name="tags"
                            value={formData.tags}
                            onChange={handleChange}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                            placeholder="Tech, Innovation, Future"
                        />
                    </div>

                    {/* Read Time */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">
                            Read Time (min)
                        </label>
                        <input
                            type="number"
                            name="readTime"
                            min="1"
                            value={formData.readTime}
                            onChange={handleChange}
                            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                        />
                    </div>
                </div>

                {/* Featured Image */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                        Featured Image
                    </label>
                    <ImageUpload
                        value={formData.featuredImage}
                        onChange={(url) => setFormData(prev => ({ ...prev, featuredImage: url }))}
                        disabled={loading}
                    />
                </div>

                {/* Excerpt */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Excerpt</label>
                    <textarea
                        name="excerpt"
                        required
                        rows="3"
                        value={formData.excerpt}
                        onChange={handleChange}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                        placeholder="Brief summary of the blog post..."
                    />
                </div>

                {/* Content */}
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">
                        Content (Markdown supported)
                    </label>
                    <textarea
                        name="content"
                        required
                        rows="15"
                        value={formData.content}
                        onChange={handleChange}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white font-mono text-sm focus:outline-none focus:border-blue-500"
                        placeholder="# Blog Content goes here..."
                    />
                </div>

                {/* Checkboxes */}
                <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            name="isPublished"
                            checked={formData.isPublished}
                            onChange={handleChange}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 bg-gray-700 border-gray-600"
                        />
                        <span className="text-gray-300">Published</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            name="isFeatured"
                            checked={formData.isFeatured}
                            onChange={handleChange}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 bg-gray-700 border-gray-600"
                        />
                        <span className="text-gray-300">Featured</span>
                    </label>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-4 pt-4 border-t border-gray-700">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                        {blog ? "Update Blog" : "Create Blog"}
                    </button>
                </div>
            </form>
        </div>
    );
}
