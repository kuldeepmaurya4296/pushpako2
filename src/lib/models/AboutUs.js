import mongoose from "mongoose"

const ValueSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  icon: String,
})

const SocialLinkSchema = new mongoose.Schema({
  platform: String,
  url: String,
  icon: String,
})

const FooterLinkSchema = new mongoose.Schema({
  title: String,
  url: String,
  lastUpdated: String,
})

const CompanyInfoSchema = new mongoose.Schema({
  name: String,
  address: String,
  email: String,
  phone: String,
})

const FooterSchema = new mongoose.Schema({
  socialLinks: [SocialLinkSchema],
  privacyPolicy: FooterLinkSchema,
  faq: FooterLinkSchema,
  support: FooterLinkSchema,
  roadmap: FooterLinkSchema,
  companyInfo: CompanyInfoSchema,
})

const StatSchema = new mongoose.Schema({
  id: String,
  label: String,
  value: String,
  suffix: String,
})

const AboutUsSchema = new mongoose.Schema(
  {
    hero: {
      id: { type: String, default: "hero" },
      title: String,
      subtitle: String,
      description: String,
      backgroundImage: String,
      ctaText: String,
      ctaLink: String,
    },
    vision: {
      id: { type: String, default: "vision" },
      title: String,
      content: String,
      extendedContent: String,
      image: String,
    },
    values: [ValueSchema],
    footer: FooterSchema,
    stats: [StatSchema],
  },
  { timestamps: true }
)

export default mongoose.models.AboutUs || mongoose.model("AboutUs", AboutUsSchema)