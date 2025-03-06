"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"

interface SocialIconProps {
  href: string
  label: string
  gradient: string
  icon: React.ReactNode
  index: number
}

function SocialIcon({ href, label, gradient, icon, index }: SocialIconProps) {
  const iconVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 10,
        delay: 0.1 * i + 0.4,
      },
    }),
  }

  const labelVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 10,
        delay: 0.1 * i + 0.6,
      },
    }),
  }

  return (
    <a href={href} className="group" aria-label={label}>
      <motion.div
        className={`w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full ${gradient} transition-all duration-300 transform hover:scale-110 shadow-lg`}
        variants={iconVariants}
        custom={index}
        whileHover={{
          scale: 1.1,
          transition: { type: "spring", stiffness: 300, damping: 10 },
        }}
        whileTap={{ scale: 0.95 }}
      >
        {icon}
      </motion.div>
      <motion.span className="mt-4 block text-base font-medium text-white" variants={labelVariants} custom={index}>
        {label}
      </motion.span>
    </a>
  )
}

export default function SocialFooter() {
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
      },
    },
  }

  const paymentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 10,
        delay: 0.8,
      },
    },
  }

  const socialIcons = [
    {
      href: "https://facebook.com",
      label: "Facebook",
      gradient: "bg-gradient-to-br from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800",
      icon: (
        <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      href: "https://twitter.com",
      label: "Twitter/X",
      gradient: "bg-gradient-to-br from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black",
      icon: (
        <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
        </svg>
      ),
    },
    {
      href: "https://instagram.com",
      label: "Instagram",
      gradient:
        "bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600",
      icon: (
        <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      ),
    },
  ]

  return (
    <div className="py-24 bg-black" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          className="space-y-6 mb-12"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h2 className="text-3xl md:text-4xl font-bold text-white" variants={titleVariants}>
            Join Our Community
          </motion.h2>
          <motion.p className="text-lg text-gray-300 max-w-2xl mx-auto" variants={titleVariants}>
            Follow us for exclusive updates, offers, and inspiration
          </motion.p>
        </motion.div>

        <motion.div
          className="flex justify-center gap-8 flex-wrap"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {socialIcons.map((social, index) => (
            <SocialIcon
              key={social.label}
              href={social.href}
              label={social.label}
              gradient={social.gradient}
              icon={social.icon}
              index={index}
            />
          ))}
        </motion.div>

        <motion.div
          className="mt-16 pt-8 border-t border-gray-800"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div
            className="flex flex-col md:flex-row justify-center items-center gap-4"
            variants={paymentVariants}
          >
            <p className="text-gray-400">Payment Methods Accepted</p>
            <div className="flex items-center gap-4">
              <motion.div
                className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-white font-medium">Visa</span>
              </motion.div>
              <motion.div
                className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-white font-medium">Mpesa</span>
              </motion.div>
            </div>
          </motion.div>
          <motion.p className="text-gray-500 text-sm mt-6 -mb-16" variants={paymentVariants}>
            © {new Date().getFullYear()} Stores. All rights reserved.
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}

