"use client"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { useState } from "react"
import toast from "react-hot-toast"

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
    note: "Our specialists typically respond within 24 business hours.",
  },
}

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // 🔍 1. Console log submitted data
    console.log("📩 Contact Form Submitted:", form)

    // Basic frontend validation
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill all required fields")
      return
    }

    setLoading(true)

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (!res.ok) throw new Error("API failed")

      // ✅ Success toast
      toast.success("Message sent successfully!")

      // 🧹 Clear form after success
      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      console.error("❌ Contact submit error:", error)
      toast.error("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="min-h-screen py-24 text-white">
      <div className="container mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h1 className="text-5xl font-bold mb-6">{contactData.heading}</h1>
          <p className="text-gray-300 mb-10 max-w-xl">{contactData.intro}</p>

          <div className="space-y-6">
            {contactData.channels.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.label}
                  className="flex items-center gap-4 p-4 border border-white/10 rounded-xl"
                >
                  <Icon />
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
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="p-10 border border-white/10 rounded-2xl space-y-6"
        >
          <h2 className="text-2xl font-semibold">{contactData.form.title}</h2>
          <p className="text-gray-300">{contactData.form.note}</p>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full p-3 bg-transparent border border-white/10 rounded-lg"
            required
          />

          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full p-3 bg-transparent border border-white/10 rounded-lg"
            required
          />

          <input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="w-full p-3 bg-transparent border border-white/10 rounded-lg"
          />

          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Message"
            className="w-full p-3 h-32 bg-transparent border border-white/10 rounded-lg"
            required
          />

          <button
            disabled={loading}
            className="w-full py-3 border border-white/10 rounded-lg hover:border-white/40 transition-all"
          >
            {loading ? "Sending..." : "Submit Message"}
          </button>
        </motion.form>
      </div>
    </section>
  )
}
