"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plane, Twitter, Linkedin, Instagram, ArrowRight, Mail, Phone, ChevronDown, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const footerSections = [
  {
    title: "Product",
    links: [
      { name: "Technology", href: "/technologies" },
      { name: "Aircraft", href: "/aircraft" },
      { name: "Roadmap", href: "/roadmap" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Us", href: "/about-us" },
      { name: "Team", href: "/our-team" },
      { name: "Press", href: "/press" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "FAQ", href: "/support-faq" },
      { name: "Support", href: "/support-faq" },
      { name: "Blog", href: "/blog" },
    ],
  },
]

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com" },
  { icon: Linkedin, href: "https://linkedin.com" },
  { icon: Instagram, href: "https://instagram.com" },
]

export default function Footer() {
  const [open, setOpen] = useState(null)

  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = "/PushpakO2_PitchDeck.pdf" // PDF path
    link.download = "PushpakO2_PitchDeck.pdf"
    link.click()
  }

  return (
    <footer id="footer" className="darker border-t border-border">
      <div className="container mx-auto px-6 lg:px-10">

        {/* CTA SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-14 text-center border-b border-border"
        >
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3">
            Ready to Experience the Future of Flight?
          </h2>

          <p className="text-gray-300 max-w-xl mx-auto mb-6">
            Connect with Pushpak O2 for partnerships, investments, or media inquiries
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3">
            <Button
              variant="hero"
              size="xl"
              className="group cursor-pointer p-2 px-4 bg-[#07c5eb17] border self-center w-4/5 md:w-1/5 text-xl py-2"
              onClick={() => (window.location.href = "/contact-us")}
            >
              Schedule a Call
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              variant="heroOutline"
              size="xl"
              className="group cursor-pointer p-2 px-4 border self-center text-white w-4/5 md:w-1/5 text-xl py-2"
              onClick={handleDownload}
            >
              Download Pitch Deck
              <ArrowDown className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>

        {/* MAIN FOOTER */}
        <div className="py-4 grid md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* BRAND COLUMN */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center relative">
                <Image
                  src="/pushpako2.png"
                  alt="logo"
                  fill
                  className="object-contain"
                  sizes="40px"
                />
              </div>
              <span className="font-heading font-bold text-lg tracking-wider text-white">
                PUSHPAK O2
              </span>
            </div>

            <p className="text-sm text-gray-300 leading-relaxed mb-5 max-w-xs">
              Pushpako2 Second Floor, 11, Aadi Parishar, Bagsewaniya, Sant Ashram Nagar, Bhel Sangam Colony, Face2, Bhopal Madhya Pradesh
            </p>

            <div className="space-y-2">
              <a
                target="_blank"
                href="mailto:info@pushpak-o2.com"
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                info@pushpak-o2.com
              </a>

              <a
                target="_blank"
                href="tel:+918085613350"
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4" />
                +91-8085613350
              </a>
            </div>

          </div>

          {/* LINK COLUMNS DESKTOP */}
          {footerSections.map((section) => (
            <div key={section.title} className="hidden md:block">
              <h4 className="font-heading font-semibold text-white mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-300 hover:text-white transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* MOBILE ACCORDION */}
        <div className="md:hidden pb-10 space-y-3">
          {footerSections.map((section, index) => (
            <div
              key={section.title}
              className="border border-border rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpen(open === index ? null : index)}
                className="w-full flex justify-between items-center px-4 py-3 text-white font-medium"
              >
                {section.title}
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${open === index ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {open === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="px-4 pb-3 space-y-2"
                  >
                    {section.links.map((link) => (
                      <a
                        key={link.name}
                        href={link.href}
                        className="block text-sm text-gray-300 hover:text-white"
                      >
                        {link.name}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* BOTTOM BAR */}
        <div className="py-1 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-300">
            © 2025 Pushpak O2. All rights reserved.
          </p>

          <div className="flex gap-3">
            {socialLinks.map((s, i) => {
              const Icon = s.icon
              return (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-gray-300 hover:text-white transition"
                >
                  <Icon className="w-4 h-4" />
                </a>
              )
            })}
          </div>

          <div className="flex gap-5 text-sm">
            <a href="/privacy-policy" className="text-gray-300 hover:text-white">Privacy</a>
            <a href="/terms-condition" className="text-gray-300 hover:text-white">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
