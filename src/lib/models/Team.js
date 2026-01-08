import mongoose from "mongoose"

const TeamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    bio: { type: String, required: true },
    fullBio: { type: String },
    image: String,
    email: { type: String, required: true },
    phone: String,
    linkedin: String,
    twitter: String,
    github: String,
    department: {
      type: String,
      enum: ["Executive", "Technology", "Engineering", "Operations", "Safety", "Marketing", "Sales"],
      required: true
    },
    responsibilities: [{ type: String }],
    joinDate: { type: String, required: true },
    location: String,
    skills: [{ type: String }],
    achievements: [{ type: String }],
    isActive: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
)

// Add indexes
TeamSchema.index({ department: 1 })
TeamSchema.index({ isActive: 1 })
TeamSchema.index({ order: 1 })
TeamSchema.index({ email: 1 }, { unique: true })

export default mongoose.models.Team || mongoose.model("Team", TeamSchema)
