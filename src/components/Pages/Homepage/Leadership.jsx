"use client";

import { motion } from "framer-motion";
import { ArrowRight, Users, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { leadershipTeam, foundingLeadershipApproach } from "@/lib/data/companyData";

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay: i * 0.1 },
    }),
};

const Leadership = () => {
    return (
        <section id="leadership" className="py-24 bg-background-darker relative overflow-hidden">
            {/* Background Effects */}
            {/* <div className="absolute inset-0 bg-gradient-to-b from-background to-background-darker" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#07C5EB]/5 rounded-full blur-[120px] translate-y-1/2 translate-x-1/2" /> */}

            <div className="container mx-auto px-6 lg:px-10 relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <motion.span
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1 text-xs font-semibold bg-[#07C5EB]/10 text-[#07C5EB] rounded-full mb-6"
                    >
                        Leadership
                    </motion.span>

                    <motion.h2
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={1}
                        className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
                    >
                        Meet Our <span className="text-gradient">Founding Team</span>
                    </motion.h2>

                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={2}
                        className="text-gray-300 max-w-2xl mx-auto"
                    >
                        {foundingLeadershipApproach.description}
                    </motion.p>
                </div>

                {/* Leadership Cards */}
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
                    {leadershipTeam.map((member, index) => (
                        <motion.div
                            key={member.id}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            custom={index}
                            className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:border-[#07C5EB]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#07C5EB]/10 group relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-[#07C5EB]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6">
                                {/* Profile Image */}
                                <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[#07C5EB]/30 shrink-0 group-hover:border-[#07C5EB] transition-colors duration-300">
                                    <Image
                                        // src={member.image || "/placeholder-avatar.jpg"}
                                        src={"/placeholder-avatar.jpg"}

                                        alt={member.name}
                                        fill
                                        className="object-cover"
                                        sizes="96px"
                                    />
                                </div>

                                {/* Info */}
                                <div className="flex-1 text-center md:text-left">
                                    <h3 className="text-2xl font-bold gray-300 mb-1">
                                        {member.name}
                                    </h3>
                                    <p className="text-[#07C5EB] font-medium mb-3">
                                        {member.role}
                                    </p>
                                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                                        {member.bio}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Leadership Approach */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="max-w-4xl mx-auto bg-card/30 backdrop-blur-md border border-white/5 rounded-2xl p-8 mb-12"
                >
                    <div className="flex flex-col md:flex-row gap-8 items-center">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-xl bg-[#07C5EB]/10 flex items-center justify-center">
                                    <Users className="w-6 h-6 text-[#07C5EB]" />
                                </div>
                                <h3 className="text-xl font-bold gray-300">
                                    {foundingLeadershipApproach.title}
                                </h3>
                            </div>
                            <p className="text-gray-300 italic mb-6">
                                "{foundingLeadershipApproach.conclusion}"
                            </p>
                        </div>

                        <div className="flex-1 grid gap-3 w-full">
                            {foundingLeadershipApproach.points.map((point, index) => (
                                <div key={index} className="flex items-center gap-3 bg-background/50 p-3 rounded-lg border border-white/5">
                                    <CheckCircle className="w-5 h-5 text-[#07C5EB] shrink-0" />
                                    <span className="text-gray-300 text-sm font-medium">{point}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <Button
                        asChild
                        variant="hero"
                        size="xl"
                        className="group text-white cursor-pointer bg-[#07C5EB] hover:bg-[#07C5EB]/90 border-0"
                    >
                        <Link href="/our-team" className="flex items-center gap-2 p-2">
                            <span>View Full Team</span>
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
};

export default Leadership;
