"use client";

import { motion } from "framer-motion";
import { Clock, Map, Package, Leaf, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const highlights = [
  {
    icon: Clock,
    label: "5+ Hours Flight Time",
    description: "Unprecedented endurance versus battery alternatives",
  },
  {
    icon: Map,
    label: "300+ km Range",
    description: "Intercity operations capability",
  },
  {
    icon: Package,
    label: "400 kg Payload",
    description: "Industry-leading capacity",
  },
  {
    icon: Leaf,
    label: "Zero Emissions",
    description: "Hydrogen fuel cell clean technology",
  },
];

const About = () => {
  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src={`\hero-aircraft.jpg`}
                alt="Pushpak Aircraft in Flight"
                className="w-full h-auto object-cover aspect-[4/3]"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>

            {/* Floating Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-8 -right-4 lg:right-8 bg-card border border-border rounded-xl p-5 shadow-xl"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Leaf className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">Zero</p>
                  <p className="text-sm text-muted-foreground">Carbon Emissions</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-3 py-1 text-xs font-semibold  bg-primary/10 rounded-full mb-4">
              About Us
            </span>

            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold  mb-4">
              Experience Advanced <span className="text-gradient">Innovation</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-6">
              Hydrogen-Electric Hybrid Aircraft with Excellence in Technology & Design
            </p>

            <p className="text-muted-foreground mb-8 leading-relaxed">
              Pushpak O2 represents a revolutionary approach to urban air mobility,
              combining hydrogen fuel cell technology with AI-enabled autonomous flight systems.
              Our aircraft deliver unprecedented performance characteristics:
            </p>

            {/* Highlights Grid */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {highlights.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-3 p-4 rounded-xl bg-card/50 border border-border hover:border-primary/30 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">{item.label}</p>
                      <p className="text-xs text-muted-white mt-0.5">{item.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="group text-black cursor-pointer"
            >
              <Link href="/about-us" className="flex items-center">
                <span>Learn More About Us</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
