"use client"
import { motion } from "framer-motion"

const supportData = {
  title: "Support & Knowledge Base",
  intro:
    "Find answers to common questions and explore detailed technical support resources for Pushpak O2 platforms.",
  faqs: [
    { q: "When will Pushpak O2 be commercially available?", a: "Pilot programs begin in 2026, followed by phased global deployment." },
    { q: "What certifications are you pursuing?", a: "EASA, DGCA, and FAA concurrent certification programs." },
    { q: "How does hydrogen safety compare?", a: "Our system meets aerospace-grade hydrogen safety standards exceeding current regulations." },
    { q: "Do you offer enterprise fleet programs?", a: "Yes, customized fleet solutions are available for enterprise partners." },
  ],
}

export default function FAQs() {
  return (
    <section className="py-24 text-white">
      <div className="container mx-auto px-6 lg:px-10 max-w-4xl">
        <h1 className="text-5xl font-bold mb-4 text-center">{supportData.title}</h1>
        <p className="text-gray-300 text-center mb-14">{supportData.intro}</p>

        <div className="space-y-6">
          {supportData.faqs.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 border border-white/10 rounded-xl hover:border-white/30 transition-all"
            >
              <h3 className="font-semibold mb-2">{item.q}</h3>
              <p className="text-gray-300">{item.a}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
