"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import {
    Linkedin, Twitter, Mail, ChevronDown, ChevronUp,
    CheckCircle, ArrowUpRight
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function LeaderCard({ member, index, hideBio = false }) {
    const [expanded, setExpanded] = useState(false)

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative h-full"
        >
            {/* Glow Effect Backend */}
            <div className="absolute -inset-0.5 bg-gradient-to-b from-[#07C5EB]/50 to-transparent rounded-2xl blur opacity-0 group-hover:opacity-20 transition duration-500" />

            <div className="relative h-full bg-[#060B18]/80 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-[#07C5EB]/30 transition-all duration-300 flex flex-col">
                {/* Top Section with Background Gradient */}
                <div className="relative h-24 bg-gradient-to-b from-[#07C5EB]/10 to-transparent">
                    <div className="absolute top-4 right-4 flex gap-2">
                        {member.linkedin && (
                            <a href={member.linkedin} target="_blank" rel="noreferrer" className="p-2 bg-black/20 hover:bg-[#07C5EB] rounded-full text-white/70 hover:text-white transition-all duration-300">
                                <Linkedin className="w-4 h-4" />
                            </a>
                        )}
                    </div>
                </div>

                {/* Profile Image - Overlapping */}
                <div className="px-6 -mt-12 flex justify-between items-end mb-4">
                    <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-4 border-[#060B18] shadow-xl group-hover:scale-105 transition-transform duration-500">
                        <Image
                            src={member.image || "/placeholder-avatar.jpg"}
                            alt={member.name}
                            fill
                            className="object-cover"
                            sizes="96px"
                        />
                    </div>
                    {/* Department Badge */}
                    {member.department && (
                        <span className="px-3 py-1 text-[10px] uppercase font-bold tracking-wider text-[#07C5EB] bg-[#07C5EB]/10 border border-[#07C5EB]/20 rounded-full mb-2">
                            {member.department}
                        </span>
                    )}
                </div>

                {/* Content */}
                <div className="px-6 pb-6 flex flex-col flex-grow">
                    <div className="mb-4">
                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-[#07C5EB] transition-colors">{member.name}</h3>
                        <p className="text-sm font-medium text-gray-400">{member.role}</p>
                    </div>

                    <p className="text-sm text-gray-400 leading-relaxed line-clamp-3 mb-6 flex-grow">
                        {member.bio}
                    </p>

                    {/* Expand Action */}
                    {member.fullBio && !hideBio && (
                        <div className="mt-auto pt-4 border-t border-white/5">
                            <button
                                onClick={() => setExpanded(!expanded)}
                                className="flex items-center gap-2 text-xs font-semibold text-white/50 hover:text-[#07C5EB] transition-colors w-full uppercase tracking-wider group/btn"
                            >
                                {expanded ? "Collapse Bio" : "Read Full Bio"}
                                {expanded ? (
                                    <ChevronUp className="w-3 h-3 group-hover/btn:-translate-y-0.5 transition-transform" />
                                ) : (
                                    <ArrowUpRight className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                                )}
                            </button>
                        </div>
                    )}
                </div>

                {/* Expanded Content Overlay */}
                <AnimatePresence>
                    {expanded && member.fullBio && !hideBio && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-[#060B18] border-t border-[#07C5EB]/20"
                        >
                            <div className="p-6">
                                <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line mb-6">
                                    {member.fullBio}
                                </p>

                                {member.responsibilities && member.responsibilities.length > 0 && (
                                    <div className="space-y-3">
                                        <h4 className="text-xs font-bold text-[#07C5EB] uppercase tracking-wider">Key Focus</h4>
                                        <ul className="space-y-2">
                                            {member.responsibilities.map((resp, idx) => (
                                                <li key={idx} className="flex items-start gap-2 text-xs text-gray-400">
                                                    <CheckCircle className="w-3 h-3 text-[#07C5EB] mt-0.5 shrink-0" />
                                                    <span>{resp}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Footer Socials in Expanded View for Mobile ease */}
                                <div className="flex gap-4 mt-6 pt-4 border-t border-white/5">
                                    {member.twitter && (
                                        <a href={member.twitter} target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors">
                                            <Twitter className="w-4 h-4" />
                                        </a>
                                    )}
                                    {member.email && (
                                        <a href={`mailto:${member.email}`} className="text-gray-500 hover:text-white transition-colors">
                                            <Mail className="w-4 h-4" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    )
}
