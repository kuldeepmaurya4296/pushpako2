
"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

const teamData = {
  title: "Our Leadership",
  subtitle:
    "A multidisciplinary leadership team combining aerospace engineering, artificial intelligence, and software innovation to advance hydrogen-powered aviation.",
}

export default function TeamPage({ members: membersData }) {
  return (
    <section className="py-24 text-white">
      <div className="container mx-auto px-6 lg:px-10 text-center">
        <h1 className="text-5xl font-bold mb-4">
          {teamData.title}
        </h1>

        <p className="text-gray-300 max-w-3xl mx-auto mb-14">
          {teamData.subtitle}
        </p>

        {membersData.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {membersData.map((m, i) => (
              <motion.div
                key={m._id || m.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 border border-white/10 rounded-2xl hover:border-white/30 hover:-translate-y-1 transition-all text-center"
              >
                {/* Profile Image */}
                <div className="relative w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border border-white/10">
                  <Image
                    src={m.image || "/placeholder-avatar.jpg"}
                    alt={m.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>

                <h3 className="text-xl font-semibold">
                  {m.name}
                </h3>

                <p className="text-sm text-gray-300 mb-3">
                  {m.role}
                </p>

                <p className="text-sm text-gray-400 leading-relaxed">
                  {m.bio}
                </p>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-gray-400 mb-4">No team members found</h3>
            <p className="text-gray-500">Team members will be displayed here once added.</p>
          </motion.div>
        )}
      </div>
    </section>
  )
}
