"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Mail, MapPin, ArrowRight, CheckCircle2 } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle")
  const [error, setError] = useState<string>("")

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("loading")
    try {
      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error("Submission failed")

      setStatus("success")
      setFormData({ name: "", email: "", message: "" })
    } catch (err) {
      console.error(err)
      setError(err instanceof Error ? err.message : "An error occurred")
      setStatus("error")
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  }

  const formItemVariants = {
    hidden: { x: -10, opacity: 0 },
    visible: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: i * 0.1,
      },
    }),
  }

  const successVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
    exit: {
      scale: 0.8,
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
  }

  return (
    <section className="py-20 px-4 md:py-32" ref={ref}>
      <motion.div
        className="container max-w-5xl mx-auto"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className="grid gap-8 md:gap-16">
          {/* Header */}
          <motion.div className="space-y-2" variants={itemVariants}>
            <motion.h1 className="text-3xl md:text-4xl font-medium tracking-tight uppercase" variants={itemVariants}>
              Contact
            </motion.h1>
            <motion.p className="text-muted-foreground max-w-[600px] uppercase text-xs" variants={itemVariants}>
              Have questions about our products or services? We are here to help and answer any questions you might have.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16 -mt-5">
            {/* Contact Form */}
            <motion.div className="space-y-6" variants={itemVariants}>
              <motion.div className="space-y-2" variants={itemVariants}>
                <motion.h2 className="text-xl font-medium uppercase" variants={itemVariants}>
                  Send a message
                </motion.h2>
              </motion.div>

              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div
                    key="success"
                    className="rounded-md border p-6 flex flex-col items-center justify-center text-center space-y-4 h-[320px]"
                    variants={successVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <motion.div
                      className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{
                        scale: 1,
                        transition: { delay: 0.2, type: "spring", stiffness: 200 },
                      }}
                    >
                      <CheckCircle2 className="h-6 w-6 text-primary" />
                    </motion.div>
                    <motion.h3
                      className="text-xl font-medium uppercase"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: { delay: 0.3 },
                      }}
                    >
                      Message sent
                    </motion.h3>
                    <motion.p
                      className="text-muted-foreground text-xs uppercase"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: { delay: 0.4 },
                      }}
                    >
                      Thank you for reaching out. We will get back to you shortly.
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        transition: { delay: 0.5 },
                      }}
                    >
                      <Button variant="outline" onClick={() => setStatus("idle")} className="mt-2 uppercase">
                        Send another message
                      </Button>
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-4"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <motion.div className="space-y-2 uppercase" variants={formItemVariants} custom={0}>
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        className="transition-all text-xs duration-200 focus:ring-2 focus:ring-primary/20"
                      />
                    </motion.div>
                    <motion.div className="space-y-2 uppercase" variants={formItemVariants} custom={1}>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        required
                        className="transition-all text-xs duration-200 focus:ring-2 focus:ring-primary/20"
                      />
                    </motion.div>
                    <motion.div className="space-y-2 uppercase" variants={formItemVariants} custom={2}>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="How can we help you?"
                        required
                        className="transition-all text-xs duration-200 focus:ring-2 focus:ring-primary/20"
                      />
                    </motion.div>
                    <motion.div variants={formItemVariants} custom={3}>
                      <Button type="submit" disabled={status === "loading"} className="w-full group">
                        {status === "loading" ? (
                          <span className="flex items-center">
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Sending...
                          </span>
                        ) : (
                          <span className="flex items-center uppercase">
                            Send message
                            <motion.span
                              className="ml-2 inline-block"
                              initial={{ x: 0 }}
                              whileHover={{ x: 4 }}
                              transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                              <ArrowRight className="h-4 w-4" />
                            </motion.span>
                          </span>
                        )}
                      </Button>
                    </motion.div>
                    {status === "error" && (
                      <motion.p
                        className="text-sm text-red-500 mt-2"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {error}
                      </motion.p>
                    )}
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Contact Info */}
            <motion.div className="space-y-8" variants={itemVariants}>
              <motion.div className="space-y-2" variants={itemVariants}>
                <motion.h2 className="text-xl font-medium uppercase" variants={itemVariants}>
                  Contact information
                </motion.h2>
                <motion.p className="text-xs text-muted-foreground uppercase" variants={itemVariants}>
                  Our team is available Monday through Friday from 9am to 5pm.
                </motion.p>
              </motion.div>

              <motion.div className="space-y-6" variants={containerVariants}>
                <motion.div
                  className="flex items-start gap-4"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <motion.div
                    className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0"
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: "rgba(var(--primary), 0.2)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Mail className="h-5 w-5 text-primary" />
                  </motion.div>
                  <div>
                    <h3 className="font-medium uppercase">Email us</h3>
                    <p className="text-xs text-muted-foreground mt-1 uppercase">Our friendly team is here to help.</p>
                    <motion.a
                      href="mailto:hello@example.com"
                      className="text-sm mt-2 inline-block text-primary "
                      whileHover={{
                        scale: 1.02,
                        textDecoration: "underline",
                      }}
                    >
                      hello@example.com
                    </motion.a>
                  </div>
                </motion.div>

                <Separator />

                <motion.div
                  className="flex items-start gap-4"
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <motion.div
                    className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0"
                    whileHover={{
                      scale: 1.1,
                      backgroundColor: "rgba(var(--primary), 0.2)",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <MapPin className="h-5 w-5 text-primary" />
                  </motion.div>
                  <div>
                    <h3 className="font-medium uppercase">Visit us</h3>
                    <p className="text-xs text-muted-foreground mt-1 uppercase">Come say hello at our office.</p>
                    <p className="text-sm mt-2">
                      100 Main Street
                      <br />
                      Nairobi, Kenya
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">Open Monday-Friday, 9AM-5PM</p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

