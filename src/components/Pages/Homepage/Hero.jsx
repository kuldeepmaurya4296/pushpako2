"use client"

import { motion } from "framer-motion"
import { ArrowRight, TrendingUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Squares } from "../../ui/square"
import Link from "next/link"
import Image from "next/image"

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden text-white bg-[#060B18]"
    >
      {/* Squares Component */}
      <div className="absolute w-full h-full">
        <Squares />
      </div>
      {/* Background Gradient */}
      {/* <div className="absolute inset-0 -z-20 bg-gradient-to-b from-[#0f0f0f] via-[#1a1a1a] to-[#111111]" /> */}

      {/* Subtle Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] -z-10"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />



      {/* Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10" />

      <div className="relative z-10 container mx-auto px-6 lg:px-10 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative inline-flex items-center gap-3 px-5 py-2.5 mb-10 rounded-full overflow-hidden border border-white/10 mt-4"
        >
          {/* Animated Gradient Background */}
          <motion.div
            className="absolute text-white inset-0 bg-gradient-to-r from-primary via-cyan-400 to-purple-500"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              backgroundSize: "300% 300%",
            }}
          />

          {/* Glow Layer */}
          <div className="absolute inset-0 blur-xl bg-gradient-to-r from-primary/40 via-cyan-400/40 to-purple-500/40 opacity-70" />

          {/* Content */}
          <div className="relative z-10 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-ping" />
            <span className="w-2.5 h-2.5 rounded-full bg-white absolute" />

            <span className="text-sm font-semibold tracking-wide text-white">
              Series A: ₹200 Crores Funding
            </span>
          </div>
        </motion.div>


        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold  max-w-4xl mx-auto leading-tight"
        >
          Experience <span className="text-[#07C5EB]">Refined</span> Innovation
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-6 text-lg md:text-xl  max-w-2xl mx-auto leading-relaxed"
        >
          Hydrogen-electric hybrid passenger drones with AI autonomy for the
          future of urban and intercity transport
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >

          <Button
            asChild
            variant="hero"
            size="xl"
            className="group cursor-pointer p-2 px-4 bg-[#07C5EB] border w-4/5 md:w-1/5 text-xl py-2"
          >
            <Link href="/technologies" className="flex items-center justify-center space-x-3">
              <span>Explore Technology</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>



          <Button variant="heroOutline" size="xl" className="group cursor-pointer p-2 px-4 border text-white w-4/5 md:w-1/5 text-xl py-2">
            <TrendingUp className="w-5 h-5" />
            Investor Portal
          </Button>
        </motion.div>

        {/* Hero Aircraft Image */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 relative"
        >
          <div className="relative max-w-5xl mx-auto">
            <div className="absolute inset-0 bg-primary/20 blur-[80px] rounded-full scale-75" />
            <div className="relative">
              <img
                src={'/hero-drone-video.gif'}
                alt="Pushpak O2 Hydrogen-Electric Aircraft in Flight"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/50 via-background/50 to-transparent rounded-b-2xl" />
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-1 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-muted-foreground tracking-wider uppercase">
            Scroll to explore
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          </motion.div>
        </motion.div> */}
      </div>
    </section>
  )
}
