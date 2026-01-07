import mongoose from "mongoose"

const CommentSchema = new mongoose.Schema({
  id: String,
  author: String,
  authorEmail: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
  isApproved: { type: Boolean, default: false },
})

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    authorId: { type: String, default: "admin" },
    category: { type: String, required: true },
    tags: [{ type: String }],
    featuredImage: String,
    images: [{ type: String }],
    videos: [{ type: String }],
    readTime: { type: Number, default: 5 },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    comments: [CommentSchema],
    isPublished: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
)

// Add indexes for better performance
BlogSchema.index({ category: 1 })
BlogSchema.index({ isPublished: 1 })
BlogSchema.index({ isFeatured: 1 })
BlogSchema.index({ createdAt: -1 })

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema)