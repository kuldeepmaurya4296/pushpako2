import mongoose from "mongoose"

const PortfolioItemSchema = new mongoose.Schema({
  company: String,
  percentage: Number,
  invested: Number,
  current: Number,
})

const CommunicationLogSchema = new mongoose.Schema({
  id: String,
  date: String,
  type: {
    type: String,
    enum: ["email", "call", "meeting"]
  },
  subject: String,
  summary: String,
  followUp: String,
})

const InvestorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: String,
    investmentAmount: { type: Number, required: true },
    currentValue: { type: Number, required: true },
    roi: { type: Number, default: 0 },
    joinDate: { type: String, required: true },
    profilePicture: String,
    type: {
      type: String,
      enum: ["individual", "institutional", "angel"],
      required: true
    },
    riskProfile: {
      type: String,
      enum: ["conservative", "moderate", "aggressive"],
      required: true
    },
    investmentStage: {
      type: String,
      enum: ["seed", "series-a", "series-b"],
      required: true
    },
    portfolio: [PortfolioItemSchema],
    communicationLog: [CommunicationLogSchema],
    documents: [{ type: String }],
    status: {
      type: String,
      enum: ["active", "inactive", "exited"],
      default: "active"
    },
    lastContact: String,
    nextFollowUp: String,
    notes: String,
    tags: [{ type: String }],
  },
  { timestamps: true }
)

// Add indexes
InvestorSchema.index({ email: 1 })
InvestorSchema.index({ type: 1 })
InvestorSchema.index({ status: 1 })
InvestorSchema.index({ investmentStage: 1 })

export default mongoose.models.Investor || mongoose.model("Investor", InvestorSchema)