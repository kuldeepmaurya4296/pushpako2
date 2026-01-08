"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import {
  Linkedin, Twitter, Mail, ChevronDown, ChevronUp,
  Users, ArrowRight, CheckCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { teamPageData, foundingLeadershipApproach, leadershipTeam } from "@/lib/data/companyData"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1 },
  }),
}

function LeaderCard({ member, index }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-card/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-[#07C5EB]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#07C5EB]/5 group"
    >
      <div className="p-8">
        {/* Profile Image */}
        <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-2 border-[#07C5EB]/30 group-hover:border-[#07C5EB] transition-colors duration-300 shadow-lg">
          <Image
            src={member.image || "/placeholder-avatar.jpg"}
            alt={member.name}
            fill
            className="object-cover"
            sizes="128px"
          />
        </div>

        {/* Name & Role */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-foreground mb-1 group-hover:text-white transition-colors">
            {member.name}
          </h3>
          <p className="text-[#07C5EB] font-medium text-lg">
            {member.role}
          </p>
          {member.department && (
            <span className="inline-block mt-2 px-3 py-1 text-xs  border border-white/10 rounded-full text-white">
              {member.department}
            </span>
          )}
        </div>

        {/* Short Bio */}
        <p className="text-white text-sm leading-relaxed text-center mb-6">
          {member.bio}
        </p>

        {/* Expand Button */}
        {member.fullBio && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center justify-center gap-2 w-full py-2 text-sm text-white hover:text-[#07C5EB]/80 transition-colors font-medium"
          >
            {expanded ? (
              <>
                <span>Show Less</span>
                <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                <span>Read Full Bio</span>
                <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        )}

        {/* Expanded Content */}
        {expanded && member.fullBio && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-6 border-t border-white/10"
          >
            <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-line mb-6">
              {member.fullBio}
            </div>

            {/* Responsibilities */}
            {member.responsibilities && member.responsibilities.length > 0 && (
              <div className="mt-4 bg-background/30 p-4 rounded-xl border border-white/5">
                <h4 className="text-white font-semibold mb-3 text-sm">Key Responsibilities:</h4>
                <ul className="space-y-2">
                  {member.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-white">
                      <CheckCircle className="w-4 h-4 text-[#07C5EB] mt-0.5 shrink-0" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        )}

        {/* Social Links */}
        <div className="flex justify-center gap-4 mt-6 pt-6 border-t border-white/10">
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full  border border-white/10 flex items-center justify-center hover:bg-[#07C5EB] hover:text-white hover:border-[#07C5EB] transition-all duration-300 group/icon"
            >
              <Linkedin className="w-5 h-5 text-white group-hover/icon:text-white transition-colors" />
            </a>
          )}
          {member.twitter && (
            <a
              href={member.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#07C5EB] hover:text-white hover:border-[#07C5EB] transition-all duration-300 group/icon"
            >
              <Twitter className="w-5 h-5 text-white group-hover/icon:text-white transition-colors" />
            </a>
          )}
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="w-10 h-10 rounded-full  border border-white/10 flex items-center justify-center hover:bg-[#07C5EB] hover:text-white hover:border-[#07C5EB] transition-all duration-300 group/icon"
            >
              <Mail className="w-5 h-5 text-white group-hover/icon:text-white transition-colors" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default function TeamPage({ members: membersData }) {
  // Use database data if available, otherwise use hardcoded data
  const members = membersData && membersData.length > 0 ? membersData : leadershipTeam

  return (
    <section className="py-24 text-white bg-background-darker relative overflow-hidden min-h-screen">
      {/* Background/Gradient Effects */}
      {/* <div className="absolute inset-0 bg-gradient-to-b from-background via-background-darker to-background" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#07C5EB]/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#07C5EB]/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3" /> */}

      <div className="container mx-auto px-6 lg:px-10 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="inline-block px-4 py-1 text-xs font-semibold bg-[#07C5EB]/10 text-[#07C5EB] rounded-full mb-6 border border-[#07C5EB]/20"
          >
            Leadership Team
          </motion.span>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6"
          >
            {teamPageData.title}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed"
          >
            {teamPageData.subtitle}
          </motion.p>
        </div>

        {/* Leadership Cards */}
        {members.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-24">
            {members.map((m, i) => (
              <LeaderCard
                key={m._id || m.id || m.name}
                member={m}
                index={i}
              />
            ))}
          </div>
        ) : (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">No team members found</h3>
            <p className="text-gray-500">Team members will be displayed here once added.</p>
          </motion.div>
        )}

        {/* Leadership Approach Section */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-card/30 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#07C5EB]/5 to-transparent pointer-events-none" />

          <div className="relative z-10">
            <div className="text-center mb-10">
              <div className="w-16 h-16 rounded-2xl bg-[#07C5EB]/10 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#07C5EB]/5 ring-1 ring-[#07C5EB]/20">
                <Users className="w-8 h-8 text-[#07C5EB]" />
              </div>
              <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
                {foundingLeadershipApproach.title}
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {foundingLeadershipApproach.description}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-10">
              {foundingLeadershipApproach.points.map((point, index) => (
                <motion.div
                  key={index}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={index}
                  className="flex items-center gap-4 p-4 rounded-xl bg-background/50 border border-white/5 hover:border-[#07C5EB]/30 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-[#07C5EB]/10 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-4 h-4 text-[#07C5EB]" />
                  </div>
                  <span className="text-gray-300 font-medium">{point}</span>
                </motion.div>
              ))}
            </div>

            <p className="text-gray-500 text-center italic border-t border-white/10 pt-8 mt-8">
              "{foundingLeadershipApproach.conclusion}"
            </p>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <h3 className="text-2xl font-bold mb-4 font-heading">Join Our Mission</h3>
          <p className="text-white mb-8 max-w-2xl mx-auto">
            Explore career opportunities or partner with us to shape the future of aviation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              variant="hero"
              size="xl"
              className="group cursor-pointer p-4 px-8 bg-[#07C5EB] hover:bg-[#07C5EB]/90 text-white border-0 text-lg rounded-full"
            >
              <Link href="/contact-us" className="flex items-center justify-center space-x-3">
                <span>Contact Us</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="xl"
              className="group cursor-pointer p-4 px-8 border-white hover:text-white hover:bg-white/5 text-white bg-transparent text-lg rounded-full"
            >
              <Link href="/about-us" className="flex items-center justify-center space-x-3">
                <span>About Company</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
