"use client"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

const contactData = {
  heading: "Contact Pushpak O2",
  intro:
    "Whether you are an investor, aviation partner, research institution, or future customer — our team is here to assist you.",
  channels: [
    { icon: Mail, label: "Email", value: "info@pushpako2.com" },
    { icon: Phone, label: "Phone", value: "+91 90000 11111" },
    { icon: MapPin, label: "Headquarters", value: "Bhopal, India" },
    { icon: Clock, label: "Working Hours", value: "Mon–Fri, 10AM–6PM IST" },
  ],
  form: {
    title: "Send Us a Message",
    note:
      "Our specialists typically respond within 24 business hours with detailed guidance tailored to your inquiry.",
  },
}

export default function ContactPage() {
  return (
    <section className="min-h-screen py-24 text-white">
      <div className="container mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16">
        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h1 className="text-5xl font-bold mb-6">{contactData.heading}</h1>
          <p className="text-gray-300 mb-10 max-w-xl">{contactData.intro}</p>

          <div className="space-y-6">
            {contactData.channels.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.label}
                  className="flex items-center gap-4 p-4 border border-white/10 rounded-xl hover:border-white/30 transition-all"
                >
                  <Icon className="text-white" />
                  <div>
                    <p className="font-semibold">{item.label}</p>
                    <p className="text-gray-300">{item.value}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="p-10 border border-white/10 rounded-2xl space-y-6 hover:border-white/30 transition-all"
        >
          <h2 className="text-2xl font-semibold">{contactData.form.title}</h2>
          <p className="text-gray-300">{contactData.form.note}</p>

          <input className="w-full p-3 rounded-lg border border-white/10 bg-transparent text-white" placeholder="Full Name" />
          <input className="w-full p-3 rounded-lg border border-white/10 bg-transparent text-white" placeholder="Email Address" />
          <input className="w-full p-3 rounded-lg border border-white/10 bg-transparent text-white" placeholder="Subject" />
          <textarea className="w-full p-3 h-32 rounded-lg border border-white/10 bg-transparent text-white" placeholder="Message" />
          <button className="w-full py-3 border cursor-pointer border-white/10 rounded-lg hover:border-white/40 transition-all">
            Submit Message
          </button>
        </motion.form>
      </div>
    </section>
  )
}
