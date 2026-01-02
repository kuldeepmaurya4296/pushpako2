
"use client"
import { motion } from "framer-motion"
import Image from "next/image"

const teamData = {
  title: "Our Leadership",
  subtitle:
    "A multidisciplinary leadership team combining aerospace engineering, artificial intelligence, and software innovation to advance hydrogen-powered aviation.",
  members: [
    {
      name: "Arjun Mehta",
      role: "Founder & Chief Executive Officer",
      image: "/team/arjun-mehta.jpg",
      bio: "A seasoned aerospace executive with over two decades of experience in aircraft programs, strategic growth, and venture leadership."
    },
    {
      name: "Neha Rao",
      role: "Chief Technology Officer",
      image: "/team/neha-rao.jpg",
      bio: "An accomplished technologist and former avionics researcher specializing in autonomous flight systems and AI-driven aviation platforms."
    },
    {
      name: "Ravi Sharma",
      role: "Head of Engineering",
      image: "/team/ravi-sharma.jpg",
      bio: "Engineering leader with deep expertise in hydrogen propulsion, safety-critical systems, and next-generation aircraft design."
    },
    {
      name: "Kuldeep Maurya",
      role: "Software Developer",
      image: "/kuldeep-maurya.jpg",
      bio: "Software developer focused on building scalable, high-performance web applications with clean architecture and reliable systems."
    },
  ],
}

export default function TeamPage() {
  return (
    <section className="py-24 text-white">
      <div className="container mx-auto px-6 lg:px-10 text-center">
        <h1 className="text-5xl font-bold mb-4">
          {teamData.title}
        </h1>

        <p className="text-gray-300 max-w-3xl mx-auto mb-14">
          {teamData.subtitle}
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamData.members.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 border border-white/10 rounded-2xl hover:border-white/30 hover:-translate-y-1 transition-all text-center"
            >
              {/* Profile Image */}
              <div className="relative w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border border-white/10">
                <Image
                  src={m.image}
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
      </div>
    </section>
  )
}
