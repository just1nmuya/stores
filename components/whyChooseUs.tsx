"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Check, Clock, ShieldCheck } from "lucide-react"

interface FeatureCardProps {
  title: string
  description: string
  icon: React.ReactNode
  gradient: string
  index: number
}

function FeatureCard({ title, description, icon, gradient, index }: FeatureCardProps) {
  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 12,
        delay: 0.1 * i + 0.6,
      },
    }),
  }

  const iconVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: 0.2 * index + 0.8,
      },
    },
  }

  return (
    <motion.div
      className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
      variants={cardVariants}
      custom={index}
    >
      <div className="flex justify-center mb-6">
        <motion.div
          className={`w-16 h-16 ${gradient} rounded-full flex items-center justify-center`}
          variants={iconVariants}
        >
          {icon}
        </motion.div>
      </div>
      <h3 className="text-xl font-semibold mb-3 text-center">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </motion.div>
  )
}

export default function WhyChooseUs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const titleVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        delay: 0.2,
      },
    },
  }

  const features = [
    {
      title: "Quality Assurance",
      description: "Every product is rigorously tested to meet our high standards",
      icon: <Check className="w-8 h-8 text-white" />,
      gradient: "bg-gradient-to-br from-purple-400 to-pink-500",
    },
    {
      title: "Fast Delivery",
      description: "Express shipping options available nationwide",
      icon: <Clock className="w-8 h-8 text-white" />,
      gradient: "bg-gradient-to-br from-pink-400 to-red-500",
    },
    {
      title: "24/7 Support",
      description: "Dedicated customer service team always ready to help",
      icon: <ShieldCheck className="w-8 h-8 text-white" />,
      gradient: "bg-gradient-to-br from-blue-400 to-purple-500",
    },
  ]

  return (
    <div className="py-24 bg-gradient-to-b from-white to-pink-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-900 relative inline-block"
            variants={titleVariants}
          >
            Why Choose Us
            <motion.span
              className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 transform translate-y-2"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            ></motion.span>
          </motion.h2>
          <motion.p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto" variants={titleVariants}>
            We are committed to providing the best shopping experience
          </motion.p>
        </motion.div>
        <motion.div
          className="grid md:grid-cols-3 gap-8"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              gradient={feature.gradient}
              index={index}
            />
          ))}
        </motion.div>
      </div>
    </div>
  )
}

