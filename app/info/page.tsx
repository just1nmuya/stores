"use client"

import { useRef, useState } from "react"
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Mail, Copy, Check } from "lucide-react"

export default function InfoPage() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [60, 0, 0, -60])

  const copyEmail = () => {
    navigator.clipboard.writeText("info@stores.com")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  }

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20,
        delay: 0.1 + i * 0.1,
      },
    }),
  }

  const sections = [
    {
      id: "about",
      title: "About",
      content:
        "Stores is a contemporary clothing brand focused on minimalist design and high-quality materials. Founded in 2025, we create timeless pieces that blend comfort with distinctive aesthetics.",
      additionalContent:
        "Our design philosophy centers on creating versatile garments that transcend seasonal trends, focusing instead on quality craftsmanship and thoughtful details.",
    },
    {
      id: "shipping",
      title: "Shipping",
      content:
        "Free shipping on all orders over $150. Standard shipping is $10 for domestic orders. International shipping available to select countries.",
      additionalContent:
        "All orders are processed within 1-2 business days. Expedited shipping options are available at checkout. Tracking information is provided via email once your order ships.",
    },
    {
      id: "returns",
      title: "Returns",
      content:
        "We accept returns within 14 days of delivery. Items must be unworn, unwashed, and with original tags attached.",
      additionalContent:
        "Return shipping is free for domestic orders. International returns are the responsibility of the customer. Refunds are processed within 5-7 business days after we receive your return.",
    },
    {
      id: "contact",
      title: "Contact",
      content: "For any inquiries, please email us at info@stores.com",
      hasLink: true,
      additionalContent:
        "Our customer service team is available Monday through Friday, 9AM-5PM EST. We aim to respond to all inquiries within 24 hours.",
    },
  ]

  return (
    <div className="min-h-screen pt-32 md:pt-40 -mt-10 pb-32" ref={containerRef}>
      <motion.div
        className="max-w-[1400px] mx-auto px-4 md:px-8"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
        style={{ opacity, y }}
      >
        <motion.div className="flex items-center space-x-3 mb-32" variants={titleVariants}>
          <motion.span
            className="inline-block w-8 h-[1px] bg-black"
            initial={{ width: 0 }}
            animate={isInView ? { width: 32 } : { width: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          />
          <motion.h1 className="text-xs uppercase tracking-wider font-normal" variants={titleVariants}>
            Information
          </motion.h1>
        </motion.div>

        <div className="space-y-32 max-w-4xl">
          {sections.map((section, index) => (
            <motion.section
              key={section.id}
              id={section.id}
              className="relative"
              variants={sectionVariants}
              custom={index}
              onHoverStart={() => setActiveSection(section.id)}
              onHoverEnd={() => setActiveSection(null)}
              whileHover={{ x: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="grid md:grid-cols-[200px_1fr] gap-6 md:gap-16">
                <div>
                  <motion.div
                    className="flex items-center space-x-2"
                    initial={{ opacity: 0.8 }}
                    animate={{
                      opacity: activeSection === section.id ? 1 : 0.8,
                      x: activeSection === section.id ? 5 : 0,
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <motion.span
                      className="inline-block w-4 h-[1px] bg-black"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: 16 } : { width: 0 }}
                      transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                    />
                    <motion.h2 className="text-xs uppercase tracking-wider font-normal">{section.title}</motion.h2>
                  </motion.div>
                </div>

                <div className="space-y-6">
                  <motion.p
                    className="text-sm leading-relaxed"
                    initial={{ opacity: 0.9 }}
                    animate={{
                      opacity: activeSection === section.id ? 1 : 0.9,
                    }}
                  >
                    {section.content}
                  </motion.p>

                  <motion.p
                    className="text-sm text-muted-foreground leading-relaxed"
                    initial={{ opacity: 0.7 }}
                    animate={{
                      opacity: activeSection === section.id ? 0.9 : 0.7,
                    }}
                  >
                    {section.additionalContent}
                  </motion.p>

                  {section.hasLink && (
                    <div className="pt-2 flex items-center space-x-4">
                      <motion.div whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                        <Link
                          href="mailto:info@stores.com"
                          className="inline-flex items-center text-xs hover:text-primary transition-colors"
                        >
                          <Mail className="h-3 w-3 mr-2" />
                          info@stores.com
                          <motion.span
                            className="ml-1 inline-block"
                            initial={{ x: 0 }}
                            whileHover={{ x: 3 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                          >
                            <ArrowRight className="h-3 w-3" />
                          </motion.span>
                        </Link>
                      </motion.div>

                      <motion.button
                        onClick={copyEmail}
                        className="inline-flex items-center text-xs text-muted-foreground hover:text-primary transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <AnimatePresence mode="wait">
                          {copied ? (
                            <motion.span
                              key="check"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex items-center"
                            >
                              <Check className="h-3 w-3 mr-1" />
                              Copied
                            </motion.span>
                          ) : (
                            <motion.span
                              key="copy"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              className="flex items-center"
                            >
                              <Copy className="h-3 w-3 mr-1" />
                              Copy
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    </div>
                  )}
                </div>
              </div>

              <motion.div
                className="absolute -left-4 top-0 bottom-0 w-[1px] bg-gray-100"
                initial={{ height: 0 }}
                animate={
                  isInView
                    ? {
                        height: "100%",
                        backgroundColor: activeSection === section.id ? "#000" : "rgba(0,0,0,0.1)",
                      }
                    : { height: 0 }
                }
                transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
              />
            </motion.section>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

