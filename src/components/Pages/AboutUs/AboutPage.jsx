"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Leaf, Brain, Plane, ArrowRight } from "lucide-react"
import { Squares } from "@/components/ui/square"
import { Button } from "@/components/ui/button"

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: i * 0.1 },
    }),
}

const iconMap = {
    "Sustainability": Leaf,
    "Autonomy": Brain,
    "Engineering": Plane,
}

export default function AboutPage() {
    const [aboutData, setAboutData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                setLoading(true)
                const response = await fetch('/api/about-us')
                if (!response.ok) {
                    throw new Error('Failed to fetch about us data')
                }
                const data = await response.json()
                setAboutData(data)
                setError(null)
            } catch (err) {
                setError(err.message)
                console.error('Error fetching about us data:', err)
            } finally {
                setLoading(false)
            }
        }

        fetchAboutData()
    }, [])

    if (loading) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                <span className="ml-3 text-gray-300">Loading...</span>
            </main>
        )
    }

    if (error) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-red-400 mb-4">Error loading page</h2>
                    <p className="text-gray-500">{error}</p>
                </div>
            </main>
        )
    }

    if (!aboutData) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-400 mb-4">No content available</h2>
                    <p className="text-gray-500">About us content will be displayed here once added.</p>
                </div>
            </main>
        )
    }
    return (
        <main className="">

            {/* HERO */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background-darker to-background-darker" />
                <div className="absolute top-1/2 left-1/2 w-[700px] h-[700px] bg-primary/10 rounded-full blur-[180px] -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute w-full h-full">
                    <Squares />
                </div>
                <div className="relative container mx-auto px-6 lg:px-10 text-center py-28">
                    <motion.span
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        className="inline-block px-4 py-1 text-xs font-semibold bg-primary/10 text-white rounded-full mb-6"
                    >
                        About Pushpak O2
                    </motion.span>

                    <motion.h1
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        custom={1}
                        className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                    >
                        {aboutData.hero?.title || "Engineering the Future of"} {" "}
                        <span className="text-[#07C5EB]">{aboutData.hero?.subtitle || "Clean Air Mobility"}</span>
                    </motion.h1>

                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        custom={2}
                        className="max-w-3xl mx-auto text-gray-300 text-lg"
                    >
                        {aboutData.hero?.description || "Pushpak O2 is building hydrogen-electric aircraft that combine sustainability, autonomy, and aerospace-grade engineering."}
                    </motion.p>
                </div>
            </section>

            {/* VISION */}
            <section className="py-24">
                <div className="container mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
                            {aboutData.vision?.title || "Our Vision"}
                        </h2>

                        <p className="text-gray-300 leading-relaxed mb-6">
                            {aboutData.vision?.content || "Aviation must evolve beyond fossil fuels and fixed infrastructure. Pushpak O2 exists to enable long-range, zero-emission air mobility using hydrogen-electric propulsion."}
                        </p>

                        <p className="text-gray-300 leading-relaxed">
                            {aboutData.vision?.extendedContent || "By integrating AI-driven autonomy and advanced energy systems, we are creating aircraft designed for real-world deployment."}
                        </p>
                    </motion.div>

                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={1}
                        className="relative rounded-2xl overflow-hidden border border-border"
                    >
                        <Image
                            src="/hero-drone-video.gif"
                            alt="Hydrogen electric aircraft concept"
                            width={800}
                            height={600}
                            className="object-cover w-full h-full"
                            priority
                            unoptimized
                        />
                    </motion.div>
                </div>
            </section>

            {/* CORE VALUES */}
            <section className="py-24 bg-background-darker">
                <div className="container mx-auto px-6 lg:px-10">
                    <motion.h2
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="text-center font-heading text-3xl md:text-4xl font-bold mb-16 text-white"
                    >
                        What Defines Us
                    </motion.h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {(aboutData.values || [
                            {
                                title: "Sustainability",
                                description: "Zero-emission hydrogen propulsion aligned with global climate goals.",
                            },
                            {
                                title: "Autonomy",
                                description: "AI-powered systems enabling safe, scalable, and intelligent flight.",
                            },
                            {
                                title: "Engineering",
                                description: "Aerospace-grade design built for certification and long-term reliability.",
                            },
                        ]).map((item, i) => {
                            const isBlue = i % 2 !== 0;
                            const Icon = iconMap[item.title] || Leaf;

                            return (
                                <motion.div
                                    key={item.id || item.title}
                                    variants={fadeUp}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    custom={i}
                                    className={`p-8 rounded-2xl bg-card border transition-all duration-300 hover:shadow-xl ${isBlue
                                        ? "border-[#07C5EB]/20 hover:border-[#07C5EB]/50"
                                        : "border-border hover:border-foreground/30"
                                        }`}
                                >
                                    {/* Icon */}
                                    <div
                                        className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${isBlue
                                            ? "bg-[#07C5EB]/10 text-[#07C5EB]"
                                            : "bg-foreground/10 text-foreground"
                                            }`}
                                    >
                                        <Icon className="w-6 h-6" />
                                    </div>

                                    {/* Title */}
                                    <h3
                                        className={`font-heading text-xl font-semibold mb-3 ${isBlue ? "text-[#07C5EB]" : "text-foreground"
                                            }`}
                                    >
                                        {item.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {item.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>


            {/* CTA */}
            <section className="py-12">
                <div className="container mx-auto px-6 lg:px-10 text-center">
                    <motion.h2
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="font-heading text-3xl md:text-4xl font-bold mb-6"
                    >
                        Building the Future of Flight
                    </motion.h2>

                    <Button
                        asChild
                        variant="hero"
                        size="xl"
                        className="group cursor-pointer p-2 px-4 bg-[#07C5EB] border w-4/5 md:w-1/5 text-xl py-2"
                    >
                        <Link href="/aircraft" className="flex items-center justify-center space-x-3">
                            <span> Explore Our Aircraft</span>
                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </Button>
                </div>
            </section>

        </main>
    )
}
